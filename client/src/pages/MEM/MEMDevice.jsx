import React from "react";
import { useQuery } from '@apollo/client';
import { deviceById } from "graphql/queries";
import { DeviceData } from "components/DeviceData";
import { Button, Space } from 'antd';
import { Link } from "react-router-dom";


import './MEMDevice.css'

export default function MEMDevice(props) {

    const { match: { params } } = props;
    const { loading, error, data } = useQuery(deviceById, {
        variables: { id: params.deviceId }
    });

    return (
        <div className="defaultPage">
            <h1>Device</h1>
            {
                error &&
                <span>{error}</span>
            }
            {
                !loading && data && data.deviceById &&
                <DeviceData deviceData={data.deviceById}></DeviceData>
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
