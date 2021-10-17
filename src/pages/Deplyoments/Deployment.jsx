import React from "react";
import { deploymentById } from "graphql/queries";
import { useQuery } from '@apollo/client';
import { Button, Space } from 'antd';
import { Link } from "react-router-dom";

export default function Deployment(props) {

    const { match: { params } } = props;
    const { loading, error, data } = useQuery(deploymentById, {
        variables: { id: params.deploymentId },
        onCompleted: (data) => { console.log(data) }
    });

    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    return (
        <div className="defaultPage">
            <h1>Deployment</h1>
            {
                error &&
                <span>{error}</span>
            }
            {
                !loading && data && data.deploymentById &&
                <div>
                    <p>Name: {data.deploymentById.name}</p>
                </div>
            }
            <div className="controlBottom">
                <Space align="end">
                    <Button>
                        <Link to="#" onClick={props.history.goBack}>Back</Link>
                    </Button>
                </Space>
            </div>
        </div>
    )
}
