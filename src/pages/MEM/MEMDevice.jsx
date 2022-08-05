import React, { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { deviceById } from "graphql/queries";
import { DeviceData } from "components/DeviceData";
import { Button, Space } from 'antd';
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { postBackendApi } from 'util/api';

import './MEMDevice.css'

export default function MEMDevice(props) {
    const params = useParams();
    const navigate = useNavigate();

    const [device, setDevice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadingDevice(params.deviceId)
    },[params.deviceId])

    const loadingDevice = (id) => {
        let query = "managedDevice_CL | where id_g == '" + id + "' |  summarize arg_max(TimeGenerated, *) by id_g"

        postBackendApi("TRG4000LogAnalyticsGet", { kustoQuery: query })
            .then(response => response.json())
            .then(data => {
                console.log("query used:" + query)
                //console.group(data)
                if (data && data[0]) {
                    console.log(data[0])
                    setDevice(data[0])
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className="defaultPage">
            <h1>Device</h1>
            {
                error &&
                <span>{error}</span>
            }
            {
                !loading && device &&
                <DeviceData deviceData={device}></DeviceData>
            }
            <div className="controlBottom">
                <Space align="end">
                    <Button>
                        <Link to="#" onClick={() => navigate(-1)}>Back</Link>
                    </Button>
                </Space>
            </div>
        </div>
    )
}
