import React, { useEffect, useState, useContext, useReducer } from "react";
import DefaultPage from '../../layouts/DefaultPage';
import { configurationVersionManySortModified } from 'graphql/queries';
import { Table, Button, Space } from "antd";
import { useQuery, useMutation } from '@apollo/client';
import TenantContext from "components/TenantContext"
import { renderDate } from 'util/renderDate';
import { Link } from "react-router-dom";

import {
    EditOutlined,
    PlusOutlined,
    DeleteOutlined
  } from "@ant-design/icons";

export default function ChangeManagement() {
    const selectedTenant = useContext(TenantContext);
    console.log(selectedTenant);

    const [configurationVersions, setConfigurationVersions] = useState([]);
    const [loading, setLoading] = useState(true)

    const { loadingGraphQL, errorGraphQL, data } = useQuery(configurationVersionManySortModified, {
        variables: {},
        // TODO: we shouldn't need to do this -> find a way to integrate tenant filte rin graphql query
        onCompleted: (data) => {
            // console.log(data);
            // console.log(selectedTenant);
            let filteredConfigurationVersions = data.configurationVersionMany.filter(configurationVersion => configurationVersion.configuration.tenant._id === selectedTenant._id)
            setConfigurationVersions(filteredConfigurationVersions);
            setLoading(false);
        }
    });

    function StateIcon(props) 
    {
        switch(props.state) {
            case "new":
                return (
                    <span><PlusOutlined style={{ color: "#52c41a"}} /> New</span>
                );
            case "modified": 
                return (
                    <span><EditOutlined style={{ color: "#52c41a"}} /> Modified</span>
                )
            case "deleted":
                return (
                    <span><DeleteOutlined style={{ color: "#ff0000"}} /> Deleted</span>
                )     
        }
    }

    const columns = [
        {
            title: "Change",
            dataIndex: "state",
            render: (text, record) => (
                <Space size="middle">
                  <StateIcon state={record.state}/>
                </Space>
              ),
        },
        {
            title: "Configuration",
            dataIndex: "displayName",
            render: (text, record) => {
                let configuration = record.configuration
                let configurationType = configuration.configurationType  
                return (
                    <Link to={configurationType.category + '/' + configuration._id}>{record.displayName}</Link>
                )
            }
        },
        {
            title: "Change Date",
            dataIndex: "graphModifiedAt",
            render: (text, record) => renderDate(text),
        }
    ];

    return (
        <DefaultPage>
            <h1>Change Management</h1>
            <Table loading={loading} rowKey="id" columns={columns} dataSource={configurationVersions}></Table>
        </DefaultPage>
    );
}