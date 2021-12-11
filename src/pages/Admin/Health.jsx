import React, { useState } from "react"
import DefaultPage from '../../layouts/DefaultPage';
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { postBackendApi } from "util/api";
import { List, Avatar, Skeleton, Space, Button, Row, Col } from 'antd';

import {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    QuestionCircleOutlined,
    ApiOutlined,
    KeyOutlined,
    ConsoleSqlOutlined
} from "@ant-design/icons";

export default function Health() {

    const [health, setHealth] = useState(null);

    let data = [
        {
            key: "backendApi",
            title: "Backend API",
            description: "Backend API",
            icon: <ApiOutlined />
        },
        {
            key: "keyvault",
            title: "Keyvault",
            description: "Keyvault",
            icon: <KeyOutlined />
        },
        {
            key: "database",
            title: "Database",
            description: "Database",
            icon: <ConsoleSqlOutlined />
        }


    ]

    function checkBackend() {
        console.log("check Backend Api");
        openNotificationWithIcon('Health check', 'Check started', 'success', 4.0);

        postBackendApi("TRG3005HealthCheck", {})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                openNotificationWithIcon('Health check', 'success', 'success');
                setHealth(data);
            }).catch((error) => {
                openNotificationWithIcon('Health check', 'error', 'error');

                setHealth({
                    backendApi: {
                        status: false,
                        message: "unable to communicate with backend Api. Error" + error
                    },
                    keyvault: {
                        status: false,
                        message: "unable to check, due to backend api issues"
                    },
                    database: {
                        status: false,
                        message: "unable to check, due to backend api issues"
                    }
                })
            });
    }

    return (
        <DefaultPage>
            <h1>Health</h1>
            <div className="controlTop">
                <Space align="end">
                    <Button onClick={checkBackend}>Check</Button>
                </Space>
            </div>

            <p>
                {}
            </p>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={<Avatar icon={item.icon} />}
                                title={item.title}
                                description={item.description}
                            />
                            {
                                health &&
                                <Row align="middle">
                                    <Col span={22}>
                                        {
                                            health[item.key] && health[item.key].message &&

                                            <p>{health[item.key].message}</p>

                                        }
                                    </Col>
                                    <Col span={2}>
                                        {
                                            health[item.key] && health[item.key].status ? (
                                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                                            ) : (
                                                <CloseCircleTwoTone twoToneColor="#ff0000" />
                                            )
                                        }
                                    </Col>
                                </Row>
                            }
                            {
                                !health && <QuestionCircleOutlined />
                            }

                        </Skeleton>
                    </List.Item>
                )}
            />

        </DefaultPage>
    );
}