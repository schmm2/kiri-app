import React, { useEffect, useState } from "react";
import { msGraphResourceMany, getMsGraphResource } from "graphql/queries";
import { deleteMsGraphResource as deleteMsGraphResourceMutation } from "graphql/mutations";
import { Link } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

// antd components
import { Table, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DefaultPage from '../../layouts/DefaultPage';

export default function MsGraphResources() {
    const { loading, error, data = [] } = useQuery(msGraphResourceMany, {
        fetchPolicy: "network-only"
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
            title: "Version",
            dataIndex: "version",
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => deleteMsGraphResource(record)}>Delete</Button>
                </Space>
            ),
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    async function deleteMsGraphResource(msGraphResource) {
        /*let resource = await API.graphql(graphqlOperation(getMsGraphResource, { id: msGraphResource.id }));
        let configurationTypes = resource.data.getMSGraphResource.configurationTypes
        // console.log(msGraphResource);
        // console.log(resource);

        // check if dependend objects exist
        if (configurationTypes.items && configurationTypes.items.length > 0) {
            // unable to delete, object still in use
            console.log("unable to delete, still in use");
        } else {
            console.log("delete");

            API.graphql(
                graphqlOperation( deleteMsGraphResourceMutation, { input: { id: msGraphResource.id }})
            ).then((result) => {
                console.log("successfull sent data");
                console.log(result);
            }).catch(e => {
                console.log(e);
            });
        }*/
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
