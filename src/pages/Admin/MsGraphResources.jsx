import React from "react"
import { msGraphResourceMany, getMsGraphResource } from "graphql/queries";
import { msGraphResourceRemoveById as msGraphResourceRemoveByIdMutation } from "graphql/mutations";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { openNotificationWithIcon } from 'util/openNotificationWithIcon';

// antd components
import { Table, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DefaultPage from '../../layouts/DefaultPage';


export default function MsGraphResources() {
    const { loading, error, data = [] } = useQuery(msGraphResourceMany, {
        fetchPolicy: "cache-and-network"
    });

    const [deleteMsGraphResource] = useMutation(msGraphResourceRemoveByIdMutation, {
        onCompleted(data) {
            // console.log(data);
            if (!data.msGraphResourceRemoveById) {
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
            title: "Resource",
            dataIndex: "resource",
        },
        {
            title: "API Version",
            dataIndex: "version",
        },
        {
            title: "Deep Resolve",
            dataIndex: "objectDeepResolve",
            render: (text, record) => (text.toString())
        },
        {
            title: "Number of ConfigurationTypes",
            key: "countconfigurationtypes",
            render: (text, record) => (
                <span>{record.configurationTypes.length}</span>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        deleteMsGraphResource({
                            variables: { id: record._id },
                            refetchQueries: [
                                { query: msGraphResourceMany }
                            ]
                        });
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
            <h1>MsGraph Resources</h1>
            <Table loading={loading} rowKey="id" columns={columns} dataSource={data.msGraphResourceMany} onChange={onChange}></Table>
            <Button>
                <Link to="/msGraphResourceAdd">
                    <PlusOutlined />
                    Add Resource
                </Link>
            </Button>
        </DefaultPage>
    );
}
