import React, { useEffect, useState } from "react";
import { listConfigurationTypes } from "graphql/queries";
import { deleteConfigurationType as deleteConfigurationTypeMutation } from "graphql/mutations";
import { Link } from "react-router-dom";


// antd components
import { Table, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function ConfigurationTypes() {
    const [configurationTypes, setConfigurationTypes] = useState([]);
    const [fetching, setFetching] = useState(false);


    async function fetch() {
        /*setFetching(true);
        try {
            let configurationTypeData = await API.graphql(graphqlOperation(listConfigurationTypes));
            configurationTypeData = configurationTypeData.data.listConfigurationTypes.items;
            setConfigurationTypes(configurationTypeData);
        } catch (err) {
            console.error("error fetching ConfigurationTypes");
            console.log(err);
        }
        setFetching(false);*/
    }

    
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


    useEffect(() => {
        fetch();
    }, []);

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
            <div>
                {fetching ? (
                    <p>Fetching ConfigurationTypes...</p>
                ) : (
                        <>
                            {configurationTypes.length > 0 ? (
                                <Table rowKey="id" columns={columns} dataSource={configurationTypes} onChange={onChange}></Table>
                            ) : (
                                    <p>No ConfigurationTypes added yet</p>
                                )}
                        </>
                    )}
            </div>
            <Button>
                <Link to="/configurationTypeAdd">
                    <PlusOutlined />
                    Add Type
                </Link>
            </Button>
        </div>
    );
}
