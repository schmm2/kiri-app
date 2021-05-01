import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listMsGraphResources, getMsGraphResource } from "graphql/queries";
import { deleteMsGraphResource as deleteMsGraphResourceMutation } from "graphql/mutations";
import { Link } from "react-router-dom";


// antd components
import { Table, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function MsGraphResources() {
    const [msGraphresources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);


    async function fetch() {
        setLoading(true);
        try {
            let resources = await API.graphql(graphqlOperation(listMsGraphResources));
            console.log(resources);

            resources = resources.data.listMSGraphResources.items;
            setResources(resources);
        } catch (err) {
            console.error("error fetching Graph Resources");
            console.log(err);
        }
        setLoading(false);
    }


    useEffect(() => {
        fetch();
    }, []);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
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
        let resource = await API.graphql(graphqlOperation(getMsGraphResource, { id: msGraphResource.id }));
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
        }
    }

    return (
        <div>
            <h1>MsGraph Resources</h1>
            <Table loading={loading} rowKey="id" columns={columns} dataSource={msGraphresources} onChange={onChange}></Table>
            <Button>
                <Link to="/msGraphResourceAdd">
                    <PlusOutlined />
                    Add Resource
                </Link>
            </Button>
        </div>
    );
}
