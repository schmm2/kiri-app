import React from "react";
import { deploymentById } from "graphql/queries";
import { useQuery } from '@apollo/client';
import { Button, Space, Table } from 'antd';
import { Link } from "react-router-dom";
import { Row, Col } from 'antd';
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { apipost } from 'util/api';

export default function Deployment(props) {

    const { match: { params } } = props;
    const { loading, error, data } = useQuery(deploymentById, {
        variables: { id: params.deploymentId },
        onCompleted: (data) => { console.log(data) },
        onError: (error) => { console.log(error) }
    });

    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    const columns = [
        {
            title: "Name",
            dataIndex: ["newestConfigurationVersion", "displayName"],
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

    async function triggerDeploymentRun() {
        apipost("orchestrators/ORC1300DeploymentRun", { deploymentId: params.deploymentId })
            .then(response => {
                console.log(response)
            })
            .then(data => {
                openNotificationWithIcon('Deployment', 'Deployment started', 'success')
            }).catch((error) => {
                openNotificationWithIcon('Deployment', error, 'error')
                console.log(error);
            });
    }

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
                    <div className="controlTop">
                        <Space align="end">
                            <Button onClick={triggerDeploymentRun}>Run Deployment</Button>
                        </Space>
                    </div>
                    <p>
                        Name: {data.deploymentById.name}<br />
                        Last Execution: {data.deploymentById.executionDate}
                    </p>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col xs={24} xl={12}>
                            <h3>Configurations</h3>
                            <Table rowKey="_id" columns={columns} dataSource={data.deploymentById.configurations} />
                        </Col>
                        <Col xs={24} xl={12}>
                            <h3>Tenants</h3>
                            <Table rowKey="_id" columns={tenantColumns} dataSource={data.deploymentById.tenants} />
                        </Col>
                    </Row>
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
