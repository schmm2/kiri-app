import React, { useEffect, useContext } from "react";
import { Table, Button, Tag, Space, Badge } from "antd";
import { Link } from "react-router-dom";
import { renderDate } from "util/renderDate";
import { useLazyQuery } from "@apollo/client";
import DefaultPage from "../../layouts/DefaultPage";
import TenantContext from "components/TenantContext";
import moment from "moment";
import { GetJobsDocument } from "generated";

import { ReloadOutlined } from "@ant-design/icons";

export default function Jobs(props) {
  const selectedTenant = useContext(TenantContext);

  const [getJobs, { loadingJobs, data: jobdata }] = useLazyQuery(
    GetJobsDocument,
    {
      onCompleted: (data) => console.log(jobdata),
      onError: (error) => console.log(error),
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    if (selectedTenant) {
      getJobs({
        variables: { filter: { tenant: selectedTenant._id }, limit: 50 },
      });
    } else {
      getJobs({ variables: { limit: 50 } }); // no tenant defined, load all jobs
    }
  }, [selectedTenant, getJobs]);

  const expandedRowRender = (dataRow) => {
    const logs = dataRow.log;
    const data = [];
    const columns = [
      { title: "Message", dataIndex: "message", key: "message" },
      { title: "Action", dataIndex: "action", key: "action" },
      {
        title: "State",
        key: "state",
        render: (record) => (
          <span>
            <Badge status={record.state.toLowerCase()} text={record.state} />
          </span>
        ),
      },
    ];

    for (let i = 0; i < logs.length; ++i) {
      data.push({
        key: i,
        message: logs[i].message,
        state: logs[i].state,
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

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
          case "WARNING":
            color = "orange";
            break;
          case "ERROR":
            color = "red";
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
      defaultSortOrder: "descend",
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
          <Button onClick={getJobs}>
            Refresh <ReloadOutlined />
          </Button>
        </Space>
      </div>
      <Table
        loading={loadingJobs}
        rowKey="id"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={jobdata && jobdata.jobMany}
        onChange={onChange}
      />
      <div className="controlBottom">
        <Space align="end">
          <Button>
            <Link to={"/tenants"}>Back</Link>
          </Button>
        </Space>
      </div>
    </DefaultPage>
  );
}
