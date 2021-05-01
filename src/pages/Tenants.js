import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listTenants } from "graphql/queries";
import { deleteTenant as deleteTenantMutation } from "graphql/mutations";
import { Link } from "react-router-dom";
import { triggerTenantUpdate as triggerTenantUpdateMutation } from "graphql/mutations";
import { openNotificationWithIcon } from "util/openNotificationWithIcon";

// antd components
import { Table, Button, Space } from "antd";
import {
  PlusOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from "@ant-design/icons";

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const aadappid = process.env.REACT_APP_AADAPPID;

  async function fetchTenants() {
    setLoading(true);
    try {
      let tenantData = await API.graphql(graphqlOperation(listTenants));
      tenantData = tenantData.data.listTenants.items;
      setTenants(tenantData);
    } catch (err) {
      console.error("error loading tenants");
      console.log(err);
    }
    setLoading(false);
  }

  async function deleteTenant(tenantId) {
    try {
      await API.graphql(graphqlOperation(deleteTenantMutation, { input: { id: tenantId } }));
    } catch (err) {
    }
  }

  async function triggerTenantUpdate(tenantId) {
    console.log("update tenant data");
    console.log(tenantId);

    try {
      let response = await API.graphql(graphqlOperation(triggerTenantUpdateMutation, { tenantId: tenantId }));
      // console.log(response);
      if (response.data && response.data.triggerTenantUpdate) {
        let triggerTenantUpdateResponse = (JSON.parse(response.data.triggerTenantUpdate)).body;
        if (triggerTenantUpdateResponse && triggerTenantUpdateResponse.ok === true) {
          openNotificationWithIcon('Pull Data', 'Job started', 'success');
        } else {
          openNotificationWithIcon('Pull Data', 'Unable to start job', 'error');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTenants();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Id",
      dataIndex: "tenantId",
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
              <CloseCircleTwoTone twoToneColor="#ff0000"/>
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
      <div>
        {loading ? (
          <p>loading tenants...</p>
        ) : (
          <>
            {tenants.length > 0 ? (
              <Table rowKey="id" columns={columns} dataSource={tenants} onChange={onChange}></Table>
            ) : (
              <p>No tenants added yet</p>
            )}
          </>
        )}
      </div>
      <Button>
        <Link to="/tenantAdd">
          <PlusOutlined />
          Add Tenant
        </Link>
      </Button>
    </div>
  );
}
