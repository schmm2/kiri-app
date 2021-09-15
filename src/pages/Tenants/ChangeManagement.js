import React, { useState, useContext, useEffect } from "react";
import DefaultPage from '../../layouts/DefaultPage';
import { configurationVersionManySortModified } from 'graphql/queries';
import { Table, Space } from "antd";
import { useLazyQuery } from '@apollo/client';
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

    const [configurationVersions, setConfigurationVersions] = useState([]);
    const [loading, setLoading] = useState(true)

    const [getConfigurationVersionManySortModified] = useLazyQuery(configurationVersionManySortModified, {
        fetchPolicy: "cache-and-network",
        onCompleted: (data) => {
            if (selectedTenant && selectedTenant._id) {
                let filteredConfigurationVersions = data.configurationVersionMany.filter(configurationVersion => configurationVersion.configuration.tenant._id === selectedTenant._id)
                setConfigurationVersions(filteredConfigurationVersions);
            } else {
                setConfigurationVersions(data.configurationVersionMany)
            }
            setLoading(false);
        }
    });

    useEffect(() => {
        getConfigurationVersionManySortModified();
    }, [selectedTenant, getConfigurationVersionManySortModified]);

    function StateIcon(props) {
        switch (props.state) {
            case "new":
                return (
                    <span><PlusOutlined style={{ color: "#52c41a" }} /> New</span>
                );
            case "modified":
                return (
                    <span><EditOutlined style={{ color: "#52c41a" }} /> Modified</span>
                )
            case "deleted":
                return (
                    <span><DeleteOutlined style={{ color: "#ff0000" }} /> Deleted</span>
                )
            default:
                return;
        }
    }

    const columns = [
        {
            title: "Change",
            dataIndex: "state",
            render: (text, record) => (
                <Space size="middle">
                    <StateIcon state={record.state} />
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
            <Table loading={loading} rowKey="_id" columns={columns} dataSource={configurationVersions}></Table>
        </DefaultPage>
    );
}