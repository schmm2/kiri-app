import React, { useEffect, useState, useContext } from "react";
import { deviceMany } from "graphql/queries";
import { List, Avatar } from 'antd';
import { Link } from "react-router-dom";
import { Tabs } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import TenantContext from "components/TenantContext"

import MyBarChart from "components/BarChart";
import DoughnutChart from 'components/DoughnutChart'
import { Card } from 'antd';
import { useQuery } from '@apollo/client';

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

export default function MEMDeviceConfigurations() {
    const selectedTenant = useContext(TenantContext);
    const [devices, setDevices] = useState([]);
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [manufacturerCount, setManufacturerCount] = useState([]);
    const [osVersionCount, setOsVersionCount] = useState([]);

    function buildManufacturerData(deviceArray) {
        let manufacturerCount = [];
        for (let i = 0; i < deviceArray.length; i++) {
            let manufacturer = deviceArray[i].manufacturer;
            const foundIndex = manufacturerCount.findIndex(item => item.name === manufacturer)

            if (foundIndex >= 0) {
                manufacturerCount[foundIndex].count++;
            } else {
                manufacturerCount.push({
                    "name": manufacturer,
                    "count": 1
                });
            }
        }
        setManufacturerCount(manufacturerCount);
    }

    function buildOSData(deviceArray) {
        let osVersionCount = [];
        for (let i = 0; i < deviceArray.length; i++) {
            console.log(deviceArray[i]);

            if (deviceArray[i].value.osVersion) {
                let osVersion = deviceArray[i].value.osVersion;
                console.log(osVersion)
                const foundIndex = osVersionCount.findIndex(item => item.name === osVersion)

                if (foundIndex >= 0) {
                    osVersionCount[foundIndex].count++;
                } else {
                    osVersionCount.push({
                        "name": osVersion,
                        "count": 1
                    });
                }
            }
        }
        console.log(osVersionCount);
        setOsVersionCount(osVersionCount);
    }

    const { loadingDevices, errorDevices, data } = useQuery(deviceMany, {
        onCompleted: (data) => {
            let devices = [];
            console.log(data)

            for (let i = 0; i < data.deviceMany.length; i++) {
                let device = data.deviceMany[i];
                // parse value
                let adaptedDevice = { ...device };
                adaptedDevice.value = JSON.parse(device.value);
                devices.push(adaptedDevice);
            }
            setDevices(devices);
            setFilteredDevices(devices);
        },
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        // filter if needed
        if (selectedTenant) {
            let filteredDevices = devices.filter(device => device.tenant && (device.tenant._id === selectedTenant._id));
            setFilteredDevices(filteredDevices);
            buildManufacturerData(filteredDevices);
            buildOSData(filteredDevices);
        } else {
            setFilteredDevices(devices);
            buildManufacturerData(devices);
            buildOSData(devices);
        }
    }, [devices, selectedTenant]);

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
                        filteredDevices &&
                        <ResponsiveGridLayout className="layout"
                            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                            rowHeight={30}
                            isDraggable={false}
                            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
                            <div key="b" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
                                <Card>
                                    <div>
                                        <DesktopOutlined />
                                        <h1>{filteredDevices.length}</h1>
                                    </div>
                                </Card>
                            </div>
                            <div key="c" data-grid={{ w: 4, h: 6, x: 2, y: 0, minW: 4, minH: 3 }}>
                                <div className="card">
                                    <DoughnutChart data={manufacturerCount} dataKey={"count"}></DoughnutChart>
                                </div>
                            </div>
                            <div key="d" data-grid={{ w: 4, h: 6, x: 2, y: 0, minW: 4, minH: 3 }}>
                                <div className="card">
                                    <MyBarChart data={osVersionCount}></MyBarChart>
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
                            dataSource={filteredDevices}
                            loading={loadingDevices}
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