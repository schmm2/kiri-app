import React, { useEffect, useState } from "react";
import {  tenantMany } from "graphql/queries";
import { Link } from "react-router-dom";
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { useQuery } from '@apollo/client';
import { apipost } from 'util/api';

// antd components
import { Table, Button, Space } from "antd";
import {
  PlusOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from "@ant-design/icons";

var fileDownload = require('js-file-download');

export default function Tenants() {
  const aadappid = process.env.REACT_APP_AADAPPID_MANAGEMENT;

  const { loading, error, data, refetch } = useQuery(tenantMany, {
    fetchPolicy: "network-only"
  });

  function deleteTenant(tenant) {
    console.log(tenant);
  }

  async function triggerTenantUpdate(tenantMongoDbId) {
    console.log("update tenant data for tenantId: " + tenantMongoDbId);
    openNotificationWithIcon('Pull Data', 'start Job', 'success');

    apipost("orchestrators/ORC1000AzureDataCollect", { tenantMongoDbId: tenantMongoDbId })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        openNotificationWithIcon('Pull Data', 'Job started', 'success');
      }).catch((error) => {
        openNotificationWithIcon('Pull Data', 'Job error', 'error');
        console.log(error);
      });
  }

  async function triggerBackup(tenantDbId) {
    console.log("backup config for tenant " + tenantDbId);
    openNotificationWithIcon('Backup', 'Backup Job started', 'success', 8.0);
    let fileName = "export.zip";

    apipost("TRG2000ConfigurationBackupCreate", { tenantDbId: tenantDbId })
      .then(response => {
        let contentDisposition = response.headers.get('Content-Disposition')
        // console.log(contentDisposition);
        if (contentDisposition) {
          fileName = contentDisposition.split('filename=')[1]
          // console.log(fileName)
        }
        // read blob data
        return response.blob()
      })
      .then(data => {
        openNotificationWithIcon('Backup', 'Backup created successfully, start download', 'success')
        fileDownload(data, fileName);
      }).catch((error) => {
        openNotificationWithIcon('Backup', error, 'error')
        console.log(error);
      });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Verified",
      key: "verified",
      render: (text, record) => (
        <Space size="middle">
          {
            record.verified ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#ff0000" />
            )
          }
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="#" onClick={() => triggerBackup(record._id)}>Backup</a>
          <a rel={'external'} target="_blank" href={"https://login.microsoftonline.com/" + record.tenantId + "/adminconsent?client_id=" + aadappid}>Grant Permission</a>
          <a href="#" onClick={() => triggerTenantUpdate(record._id)}>Pull Data</a>
          <a href="#" onClick={() => deleteTenant(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div className="defaultPage">
      <h1>Tenants</h1>
      <Table loading={loading} rowKey="id" columns={columns} dataSource={data && data.tenantMany} onChange={onChange}></Table>
      <Button>
        <Link to="/tenantAdd">
          <PlusOutlined />
          Add Tenant
        </Link>
      </Button>
    </div >
  )
}
