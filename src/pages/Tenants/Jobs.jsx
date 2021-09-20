import React, { useEffect, useContext } from "react";
import { jobMany } from "graphql/queries";
import { Table, Button, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import { renderDate } from 'util/renderDate'
import moment from 'moment';
import { useLazyQuery, useQuery } from '@apollo/client';
import DefaultPage from '../../layouts/DefaultPage';
import TenantContext from "components/TenantContext"

import {
  ReloadOutlined
} from '@ant-design/icons';

export default function Jobs(props) {
  const selectedTenant = useContext(TenantContext);

  const [getJobs, { loadingJobs, data: jobdata }] = useLazyQuery(jobMany,
    {
      onCompleted: (data) => console.log(jobdata),
      fetchPolicy: "cache-and-network"
    });

  useEffect(() => {
    if (selectedTenant) {
      getJobs({
        variables: { filter: { tenant: selectedTenant._id } }
      });
    } else {
      getJobs(); // no tenant defined, load all jobs
    }
  }, [selectedTenant, getJobs]);

  const columns = [
    {
      title: "Tenant",
      dataIndex: ["tenant", "name"],
    },
    {
      title: "State",
      key: "state",
      dataIndex: "state",
      render: (state) => {
        let color = "green";

        switch (state) {
          case "STARTED":
            color = "blue";
            break;
          case "RUNNING":
            color = "blue";
            break;
          case "ERROR":
            color = "red";
            break;
          case "WARNING":
            color = "orange";
            break;
          default:
            break;
        }

        return (
          <Tag color={color} key={state}>
            {state}
          </Tag>
        );
      },
    },
    {
      title: "Job Type",
      dataIndex: "type",
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      render: (text, record) => renderDate(text),
      sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
      defaultSortOrder: 'descend'
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <DefaultPage>
      <h1>Jobs</h1>
      <div className="controlTop">
        <Space align="end">
          <Button onClick={getJobs}>Refresh <ReloadOutlined /></Button>
        </Space>
      </div>
      <Table loading={loadingJobs} rowKey="_id" columns={columns} dataSource={jobdata && jobdata.jobMany} onChange={onChange} />
      <div className="controlBottom">
        <Space align="end">
          <Button>
            <Link to={"/tenants"}>Back</Link>
          </Button>
        </Space>
      </div>
    </DefaultPage >
  );
}
