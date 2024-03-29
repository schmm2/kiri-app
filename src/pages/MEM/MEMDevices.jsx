import React, { useEffect, useState, useContext } from "react";
import { getNewestDeviceVersions } from "graphql/queries";
import { List, Avatar, Tabs } from 'antd';
import { Link } from "react-router-dom";
import { Responsive, WidthProvider } from 'react-grid-layout';
import TenantContext from "components/TenantContext"
import MyBarChart from "components/BarChart";
import DoughnutChart from 'components/DoughnutChart'
import { useQuery } from '@apollo/client';
import DefaultPage from "layouts/DefaultPage";

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
    const [filteredDevices, setfilteredDevices] = useState([]);
    const [manufacturerCount, setManufacturerCount] = useState([]);
    const [osBuildVersionCount, setOsBuildVersionCount] = useState([]);
    const [osVersionCount, setOsVersionCount] = useState([]);
    const [osCount, setOsCount] = useState(null);
    const [encryptionCount, setEncryptionCount] = useState([]);
    const [complianceCount, setComplianceCount] = useState([]);

    function buildGraphData(deviceArray) {
        let osBuildVersionCount = [];
        let osVersionCount = [];
        let manufacturerCount = [];

        let osCount = {
            Windows: 0,
            macOs: 0,
            iOS: 0,
            Android: 0
        };

        let encryptionCount = [
            {
                name: "encrypted",
                count: 0,
                color: "#08979c"
            },
            {
                name: "not-encrypted",
                count: 0,
                color: "#fa541c"
            }
        ]

        let complianceCount = [
            {
                name: "compliant",
                count: 0,
                color: "#08979c"
            },
            {
                name: "non-compliant",
                count: 0,
                color: "#fa541c"
            },
            {
                name: "grace-period",
                count: 0,
                color: "#ffa940"
            }
        ]

        for (let i = 0; i < deviceArray.length; i++) {
            if (deviceArray[i].newestDeviceVersions[0]) {
                let deviceData = deviceArray[i].newestDeviceVersions[0];
                let deviceDataValue = JSON.parse(deviceData.value);
                //console.log(deviceData);

                // OS DATA
                if (deviceData.osVersion && deviceData.operatingSystem) {
                    // build identification string        
                    const osString = deviceData.operatingSystem + " " + deviceData.osVersion
                    const foundIndex = osBuildVersionCount.findIndex(item => item.id === osString)

                    // count os build version like 10.0.19043.1288
                    if (foundIndex >= 0) {
                        osBuildVersionCount[foundIndex].count++;
                    } else {
                        osBuildVersionCount.push({
                            "name": osString,
                            "osVersion": deviceData.osVersion,
                            "count": 1,
                            "operatingSytem": deviceData.operatingSystem
                        });
                    }

                    // count os version like 20H2
                    // add os if not added already
                    if (deviceData.osVersionName) {
                        const foundIndex = osVersionCount.findIndex(item => item.name === deviceData.osVersionName)
                        // count os build version
                        if (foundIndex >= 0) {
                            osVersionCount[foundIndex].count++;
                        } else {
                            osVersionCount.push({
                                "name": deviceData.osVersionName,
                                "count": 1,
                            });
                        }
                    }

                    // count os / platform like Windows, Android
                    // add os if not added already
                    if (osCount[deviceData.operatingSystem]) {
                        osCount[deviceData.operatingSystem]++;
                    } else {
                        osCount[deviceData.operatingSystem] = 1;
                    }
                }

                // MANUFACTURER
                let manufacturer = deviceData.manufacturer;
                const foundIndex = manufacturerCount.findIndex(item => item.name === manufacturer)

                if (foundIndex >= 0) {
                    manufacturerCount[foundIndex].count++;
                } else {
                    manufacturerCount.push({
                        "name": manufacturer,
                        "count": 1
                    });
                }

                // ENCRYPTION
                if (deviceDataValue.isEncrypted) {
                    encryptionCount[0].count++;
                } else {
                    encryptionCount[1].count++;
                }

                // COMPLIANCE
                if (deviceDataValue.complianceState) {
                    switch (deviceDataValue.complianceState) {
                        case "compliant": complianceCount[0].count++; break;
                        case "noncompliant": complianceCount[1].count++; break;
                        case "graceperiod": complianceCount[2].count++; break;
                        default: break;
                    }
                }
            }
        }
        setOsBuildVersionCount(osBuildVersionCount)
        setManufacturerCount(manufacturerCount)
        setOsCount(osCount)
        setEncryptionCount(encryptionCount)
        setComplianceCount(complianceCount)
        setOsVersionCount(osVersionCount);
    }


    const { loadingDevices } = useQuery(getNewestDeviceVersions, {
        variables: { filter: { successorVersion: null } },
        onCompleted: (data) => {
            // console.log(data);
            setDevices(data.deviceMany);
            setfilteredDevices(data.deviceMany);
        },
        fetchPolicy: "cache-and-network",
        onError: (error) => {
            console.log(error)
        }
    });

    function refilter() {
        let filteredDevices = devices;

        // filter if needed
        if (selectedTenant) {
            filteredDevices = devices.filter(device => device.tenant && (device.tenant._id === selectedTenant._id));
        }
        // console.log(filteredDevices);
        setfilteredDevices(filteredDevices);
        buildGraphData(filteredDevices);
    }

    useEffect(() => {
        refilter();
    }, [selectedTenant, devices]);

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

    const layout = {
        lg: [
            { i: "devices-desktops", w: 3, h: 2, x: 0, y: 0, minW: 2, minH: 2, static: true },
            { i: "devices-windows", w: 3, h: 2, x: 3, y: 0, minW: 2, minH: 2, static: true },
            { i: "devices-ios", w: 3, h: 2, x: 6, y: 0, minW: 2, minH: 2, static: true },
            { i: "devices-android", w: 3, h: 2, x: 9, y: 0, minW: 2, minH: 2, static: true },
            { i: "osbuildversion", w: 3, h: 3, x: 0, y: 3 },
            { i: "encryption", w: 3, h: 3, x: 3, y: 3 },
            { i: "osversion", w: 3, h: 3, x: 6, y: 3 },
            { i: "compliance", w: 3, h: 3, x: 9, y: 3 },
            { i: "manufacturer", w: 3, h: 3, x: 0, y: 6 }
        ]
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
                    className="dashboard">
                    {
                        filteredDevices &&
                        <ResponsiveGridLayout className="layout"
                            breakpoints={{ lg: 1000, sm: 400 }}
                            rowHeight={100}
                            autoSize={true}
                            layouts={layout}
                            isDraggable={false}
                            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
                            <div key="devices-desktops">
                                <div className="card">
                                    <div className="card-body">
                                        <DesktopOutlined />
                                        <h1>{filteredDevices.length}</h1>
                                    </div>
                                </div>
                            </div>
                            <div key="devices-windows">
                                <div className="card">
                                    <div className="card-body">
                                        <WindowsOutlined />
                                        <h1>{osCount && osCount.Windows}</h1>
                                    </div>
                                </div>
                            </div>
                            <div key="devices-ios">
                                <div className="card">
                                    <div className="card-body">
                                        <AppleOutlined />
                                        <h1>{osCount && osCount.iOS}</h1>
                                    </div>
                                </div>
                            </div>
                            <div key="devices-android">
                                <div className="card">
                                    <div className="card-body">
                                        <AndroidOutlined />
                                        <h1>{osCount && osCount.Android}</h1>
                                    </div>
                                </div>
                            </div>
                            <div key="osbuildversion">
                                <div className="card">
                                    <MyBarChart data={osBuildVersionCount}></MyBarChart>
                                </div>
                            </div>
                            <div key="encryption">
                                <div className="card">
                                    <DoughnutChart data={encryptionCount}></DoughnutChart>
                                </div>
                            </div>
                            <div key="osversion" >
                                <div className="card">
                                    <DoughnutChart data={osVersionCount}></DoughnutChart>
                                </div>
                            </div>
                            <div key="compliance">
                                <div className="card">
                                    <DoughnutChart data={complianceCount}></DoughnutChart>
                                </div>
                            </div>
                            <div key="manufacturer">
                                <div className="card">
                                    <DoughnutChart data={manufacturerCount}></DoughnutChart>
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
                        <DefaultPage>
                            <List
                                itemLayout="horizontal"
                                dataSource={filteredDevices}
                                loading={loadingDevices}
                                renderItem={item => (
                                    <List.Item
                                        key={item.newestDeviceVersions[0].id}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar icon={renderIcon(item.newestDeviceVersions[0].operatingSystem)} />
                                            }
                                            title={<Link to={"/memDevices/" + item._id}>{item.newestDeviceVersions[0].deviceName}</Link>}
                                            description={item.newestDeviceVersions[0].upn}
                                        />
                                    </List.Item>
                                )}
                            />
                        </DefaultPage>
                    }
                </TabPane>
            </Tabs>
        </div >
    );
}