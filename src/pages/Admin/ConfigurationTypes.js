import React, { useEffect, useState } from "react";
import { configurationTypeMany } from "graphql/queries";
import { deleteConfigurationType as deleteConfigurationTypeMutation } from "graphql/mutations";
import { Link } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

// antd components
import { Table, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function ConfigurationTypes() {
    const { loading, error, data = [] } = useQuery(configurationTypeMany);

  
    function deleteConfigurationType(configurationType) {
        // console.log(configurationType);
        // console.log(configurationType.id)
        
        /*
        API.graphql(
            graphqlOperation( deleteConfigurationTypeMutation, { input: { id: configurationType.id }})
        ).then((result) => {
            console.log("successfull sent data");
            console.log(result);
        }).catch(e => {
            console.log(e);
        });*/
    }

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "odata Type",
            dataIndex: "odataType",
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
            title: "Label",
            dataIndex: "label",
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => deleteConfigurationType(record)}>Delete</Button>
                </Space>
            ),
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    return (
        <div>
            <h1>ConfigurationTypes</h1>
            <Table loading={loading} rowKey="id" columns={columns} dataSource={data.configurationTypeMany} onChange={onChange}></Table>
            <Button>
                <Link to="/configurationTypeAdd">
                    <PlusOutlined />
                    Add Type
                </Link>
            </Button>
        </div>
    );
}
