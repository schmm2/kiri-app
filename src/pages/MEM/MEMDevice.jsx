import React from "react";
import { tenantMany } from "graphql/queries";
import { useQuery } from '@apollo/client';
import { deviceById } from "graphql/queries";
import { DeviceData } from "components/DeviceData";
import { Button, Space } from 'antd';
import { Link } from "react-router-dom";

import './MEMDevice.css'

export default function MEMDevice(props) {

    const { match: { params } } = props;
    const { data, dataLoading, dataError } = useQuery(deviceById, {
        variables: { id: params.deviceId }
    });

    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    return (
        <div className="defaultPage">
            <h1>Device</h1>
            {
                data && data.deviceById && data.deviceById.newestDeviceVersions &&
                <DeviceData deviceData={data.deviceById.newestDeviceVersions[0]}></DeviceData>
            }
            <div className="controlBottom">
                <Space align="end">
                    <Button>
                        <Link onClick={props.history.goBack}>Back</Link>
                    </Button>
                </Space>
            </div>
        </div>
    )
}
