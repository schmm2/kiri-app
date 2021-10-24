import React from "react";
import { deploymentById } from "graphql/queries";
import { useQuery } from '@apollo/client';
import { Button, Space, Table } from 'antd';
import { Link } from "react-router-dom";

export default function Deployment(props) {

    const { match: { params } } = props;
    const { loading, error, data } = useQuery(deploymentById, {
        variables: { id: params.deploymentId },
        onCompleted: (data) => { console.log(data) },
        onError: (error) => { console.log(error)}
    });

    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    const columns = [
        {
          title: "Name",
          dataIndex: ["newestConfigurationVersion","displayName"],
        },
        {
            title: "Type",
            dataIndex: ["configurationType", "name"]
        }
    ]

    const tenantColumns = [
        {
          title: "Name",
          dataIndex: ["name"],
        }
    ]

    return (
        <div className="defaultPage">
            <h1>Deployment</h1>
            {
                error &&
                <span>{JSON.stringify(error)}</span>
            }
            {
                !loading && data && data.deploymentById &&
                <div>
                    <p>Name: {data.deploymentById.name}</p>
                    <h3>Configurations</h3>
                    <Table rowKey="_id" columns={columns} dataSource={data.deploymentById.configurations} /> 
                    <h3>Tenants</h3>
                    <Table rowKey="_id" columns={tenantColumns} dataSource={data.deploymentById.tenants} /> 
                </div>
            }
            <div className="controlBottom">
                <Space align="end">
                    <Button>
                        <Link to="#" onClick={props.history.goBack}>Back</Link>
                    </Button>
                </Space>
            </div>
        </div>
    )
}
