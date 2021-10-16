import React, { useState } from "react"
import DefaultPage from '../../layouts/DefaultPage';
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { apipost } from "util/api";
import { List, Avatar, Skeleton, Space, Button } from 'antd';

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

        apipost("TRG3005HealthCheck", {})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                openNotificationWithIcon('Backend check', 'success', 'success');
                setHealth(data);
            }).catch((error) => {
                openNotificationWithIcon('Backend check', 'error', 'error');
                console.log(error);
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
                                <div>
                                    {
                                        health[item.key] ? (
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                        ) : (
                                            <CloseCircleTwoTone twoToneColor="#ff0000" />
                                        )
                                    }
                                </div>
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