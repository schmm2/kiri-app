import React, { useEffect } from "react";
import { jobMany, tenantById } from "graphql/queries";
import { Table, Button, Tag } from "antd";
import { Link } from "react-router-dom";
import { renderDate } from 'util/renderDate'
import moment from 'moment';
import { useLazyQuery, gql } from '@apollo/client';
import DefaultPage from '../layouts/DefaultPage';

export default function Jobs(props) {
  const { match: { params } } = props;

  const [getJobs, { loadingJobs, data: jobdata }] = useLazyQuery(jobMany,
    { 
      onCompleted: (data) => console.log(jobdata),
      fetchPolicy: "cache-and-network"
    });

  useEffect(() => {
    if (params.tenantId) {
      getJobs({
        variables: { filter: { tenant: params.tenantId } }
      });
    } else {
      console.log("no tenant defined, load all jobs");
      getJobs();
    }
  }, [params.tenantId]);

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
      <Table loading={loadingJobs} rowKey="id" columns={columns} dataSource={jobdata && jobdata.jobMany} onChange={onChange} />
      <Button>
        <Link to={"/tenants"}>Back</Link>
      </Button>
    </DefaultPage>
  );
}
