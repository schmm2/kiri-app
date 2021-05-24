import React, { useEffect, useState } from "react";
import { deviceMany } from "graphql/queries";
import { List, Avatar } from 'antd';
import { Link } from "react-router-dom";
import { Tabs } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';


import DoughnutChart from 'components/DoughnutChart'
import { Card } from 'antd';
import { gql, useQuery } from '@apollo/client';

import {
    AndroidOutlined,
    WindowsOutlined,
    AppleOutlined,
    UnorderedListOutlined,
    PieChartOutlined,
    DesktopOutlined
} from '@ant-design/icons'

import './MEMDevices.css'

const { TabPane } = Tabs;

const ResponsiveGridLayout = WidthProvider(Responsive);

//const { Meta } = Card;

export default function MEMDeviceConfigurations() {

    const [devices, setDevices] = useState([]);
    const [manufacturerCount, setManufacturerCount] = useState([]);

    const { loading, error, deviceData } = useQuery(deviceMany, {
        onCompleted: (data) => {
            let devices = [];
            let manufacturerCount = [];

            for(let i = 0; i < data.deviceMany.length; i++){
                let device = data.deviceMany[i];

                // create manufacturer data
                let manufacturer = device.manufacturer;
                const foundIndex = manufacturerCount.findIndex(item => item.name === manufacturer)
                console.log(foundIndex);
                if (foundIndex >= 0) {
                    manufacturerCount[foundIndex].count++;
                } else {
                    manufacturerCount.push({
                        "name": manufacturer,
                        "count": 1
                    });
                }

                // parse value
                let adaptedDevice = { ...device };
                adaptedDevice.value = JSON.parse(device.value);
                console.log(adaptedDevice);

                devices.push(adaptedDevice);
            }
            setDevices(devices);
            setManufacturerCount(manufacturerCount);
        }
    });

    function renderIcon(operatingSystem) {
        switch (operatingSystem) {
            case 'Windows':
                return <WindowsOutlined />;
            case 'Android':
                return <AndroidOutlined />;
            case 'macOS':
                return <AppleOutlined />;
            default:
                return '';
        }
    }

    return (
        <div className="memDevices">
            <h1>Devices</h1>
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <PieChartOutlined />
                            Dashboard
                        </span>
                    }
                    key="1"
                    className="dashboard"
                >
                    {
                        devices &&
                        <ResponsiveGridLayout className="layout"
                            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                            rowHeight={30}
                            isDraggable={false}
                            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
                            <div key="b" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
                                <Card>
                                    <div>
                                        <DesktopOutlined />
                                        <h1>{devices.length}</h1>
                                    </div>
                                </Card>
                            </div>
                            <div key="c" data-grid={{ w: 4, h: 6, x: 2, y: 0, minW: 4, minH: 3 }}>
                                <div className="card">
                                    <DoughnutChart data={manufacturerCount} dataKey={"count"}></DoughnutChart>
                                </div>
                            </div>
                        </ResponsiveGridLayout>
                    }
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <UnorderedListOutlined />
                            List
                        </span>
                    }
                    key="2"
                >
                    {
                        devices && 
                        <List
                            itemLayout="horizontal"
                            dataSource={devices}
                            loading={loading}
                            renderItem={item => (
                                <List.Item
                                    key={item.id}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar icon={renderIcon(item.value.operatingSystem)} />
                                        }
                                        title={<Link to={"/memDevices/" + item._id}>{item.value.deviceName}</Link>}
                                        description={item.value.userPrincipalName}
                                    />
                                </List.Item>
                            )}
                        />
                    }
                </TabPane>
            </Tabs>

        </div >
    );
}