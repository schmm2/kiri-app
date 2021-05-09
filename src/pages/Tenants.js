import React, { useEffect, useState } from "react";
import { tenantMany } from "graphql/queries";
import { deleteTenant as deleteTenantMutation } from "graphql/mutations";
import { Link } from "react-router-dom";
import { triggerTenantUpdate as triggerTenantUpdateMutation } from "graphql/mutations";
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { useQuery, gql } from '@apollo/client';

// antd components
import { Table, Button, Space } from "antd";
import {
  PlusOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from "@ant-design/icons";

export default function Tenants() {
  const aadappid = process.env.REACT_APP_AADAPPID;

  const { loading, error, data = [] } = useQuery(tenantMany);

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

    try {
      /*let response = await API.graphql(graphqlOperation(triggerTenantUpdateMutation, { tenantId: tenantId }));
      // console.log(response);
      if (response.data && response.data.triggerTenantUpdate) {
        let triggerTenantUpdateResponse = (JSON.parse(response.data.triggerTenantUpdate)).body;
        if (triggerTenantUpdateResponse && triggerTenantUpdateResponse.ok === true) {
          openNotificationWithIcon('Pull Data', 'Job started', 'success');
        } else {
          openNotificationWithIcon('Pull Data', 'Unable to start job', 'error');
        }
      }*/
    } catch (err) {
      console.log(err);
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
          <Link to={"/jobs/" + record.id}>Jobs</Link>
          <a rel={'external'} target="_blank" href={"https://login.microsoftonline.com/" + record.tenantId + "/adminconsent?client_id=" + aadappid}>Grant Permission</a>
          <a href="#" onClick={() => triggerTenantUpdate(record.id)}>Pull Data</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h1>Tenants</h1>
      <Table loading={loading} rowKey="id" columns={columns} dataSource={data.tenantMany} onChange={onChange}></Table>
      <Button>
        <Link to="/tenantAdd">
          <PlusOutlined />
          Add Tenant
        </Link>
      </Button>
    </div >
  );
}
