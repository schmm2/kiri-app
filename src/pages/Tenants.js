import React, { useEffect, useState } from "react";
import { tenantById, tenantMany } from "graphql/queries";
import { deleteTenant as deleteTenantMutation } from "graphql/mutations";
import { Link } from "react-router-dom";
//import { triggerTenantUpdate as triggerTenantUpdateMutation } from "graphql/mutations";
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { useQuery, gql } from '@apollo/client';
import DefaultPage from '../layouts/DefaultPage';

// antd components
import { Table, Button, Space } from "antd";
import {
  PlusOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from "@ant-design/icons";

var fileDownload = require('js-file-download');


export default function Tenants() {
  const aadappid = process.env.REACT_APP_AADAPPID;

  const backendApiUrlBase = process.env.REACT_APP_BACKENDAPIURL;
  const functionKey = process.env.REACT_APP_FUNCTIONKEY;

  const { loading, error, data } = useQuery(tenantMany);

  /*
  function deleteTenant(tenantId) {
    const [deleteTenant, { data }] = useMutation(deleteTenantMutation);
    try {
       API.graphql(graphqlOperation(deleteTenantMutation, ));
    } catch (err) {
    }
  }*/

  async function triggerTenantUpdate(tenantId) {
    console.log("update tenant data");
    console.log(tenantId);

    if (backendApiUrlBase) {
      let functionToCall = "/orchestrators/ORC1000AzureDataCollect"
      let backendApiUrl = backendApiUrlBase + functionToCall;

      if(functionKey){
        backendApiUrl = backendApiUrl + "?code=" + functionKey
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantDbId: tenantId })
      };

      fetch(backendApiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
          openNotificationWithIcon('Pull Data', 'Job started', 'success');
        }).catch((error) => {
          openNotificationWithIcon('Pull Data', 'Job error', 'error');
        });
    }
    else {
      console.log("api endpoint not defined")
    }
  }

  async function triggerBackup(tenantDbId) {
    console.log("backup config for tenant " + tenantDbId);

    if (backendApiUrlBase) {
      let functionToCall = "/TRG2000ConfigurationBackupCreate"
      let backendApiUrl = backendApiUrlBase + functionToCall;

      if(functionKey){
        backendApiUrl = backendApiUrl + "?code=" + functionKey
      }
      let fileName = "export.zip";

      openNotificationWithIcon('Backup', 'Backup Job started', 'success', 8.0);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantDbId: tenantDbId })
      };

      fetch(backendApiUrl, requestOptions)
        .then(response => {
          // console.log(response);
          // build filename, returned in header, built serverside
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
          // console.log(data);
          openNotificationWithIcon('Backup', 'Backup created successfully, start download', 'success')
          fileDownload(data, fileName)
        }).catch((error) => {
          // console.log(error);
          openNotificationWithIcon('Backup', error, 'error')
        });
    }
    else {
      console.log("api endpoint not defined")
    }
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
          <a>Delete</a>
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
