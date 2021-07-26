import React from "react"
import { configurationTypeMany } from "graphql/queries";
import { configurationTypeRemoveById as configurationTypeRemoveByIdMutation } from "graphql/mutations";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { openNotificationWithIcon } from 'util/openNotificationWithIcon';
import DefaultPage from '../../layouts/DefaultPage';

// antd components
import { Table, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function ConfigurationTypes() {
    const { loading, error, data = [] } = useQuery(configurationTypeMany, {
        fetchPolicy: "network-only"
    });

    const [deleteConfigurationType] = useMutation(configurationTypeRemoveByIdMutation, {
        onCompleted(data) {
            // console.log(data);
            if (!data.configurationTypeRemoveById) {
                openNotificationWithIcon('Delete', 'error deleting object', 'error');
            }
        }
    });

    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Platform",
            dataIndex: "platform",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        console.log(record);
                        deleteConfigurationType({
                            variables: { id: record._id },
                            refetchQueries: [
                                { query: configurationTypeMany }
                            ]
                        })
                    }}>Delete</Button>
                </Space>
            ),
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    return (
        <DefaultPage>
            <h1>ConfigurationTypes</h1>
            <Table loading={loading} rowKey="id" columns={columns} dataSource={data.configurationTypeMany} onChange={onChange}></Table>
            <Button>
                <Link to="/configurationTypeAdd">
                    <PlusOutlined />
                    Add Type
                </Link>
            </Button>
        </DefaultPage>
    );
}
