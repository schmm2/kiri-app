import React from "react";
import { Table, Switch, Button } from 'antd';
import { Link } from "react-router-dom";
import { renderDate } from 'util/renderDate';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { deploymentMany } from "graphql/queries";

import {
    PlusOutlined
} from "@ant-design/icons";

export default function Deployments(props) {

    const { loading, error, data } = useQuery(deploymentMany, {
        fetchPolicy: 'cache-and-network'
    })

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => <Link to={'deployments/' + record._id} > {record.name} </Link>,
            visible: true
        },
        {
            title: "Modified at",
            dataIndex: ["updatedAt"],
            render: (text, record) => renderDate(text),
            sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
            defaultSortOrder: 'descend',
            visible: true
        }
    ];


    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    return (
        <div className="defaultPage">
            <h1>Deployments</h1>
            <Table rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={data && data.deploymentMany}
                onChange={onChange}
                rowKey="_id"
            />
            <Button>
                <Link to="/deploymentAdd">
                    <PlusOutlined /> Add Deployment
                </Link>
            </Button>
        </div>
    );
}