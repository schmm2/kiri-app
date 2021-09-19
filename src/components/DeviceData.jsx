import React from "react"
import { List } from 'antd';
import {
    UserOutlined,
    IdcardOutlined,
    DesktopOutlined,
    SettingOutlined,
    DeploymentUnitOutlined
} from '@ant-design/icons';

export const DeviceData = ({ graphData }) => {
    console.log(graphData)
    return (
        <List className="deviceData">
            <List.Item>
                <List.Item.Meta
                    avatar={<IdcardOutlined />}
                    description={<span>{graphData.deviceName}</span>}
                    title="Device Name"
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<UserOutlined />}
                    description={<span>{graphData.userPrincipalName}</span>}
                    title="User"
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<DesktopOutlined />}
                    title="Hardware"
                    description={<span>
                        Manufacturer: {graphData.manufacturer}<br />
                        SerialNumber: {graphData.serialNumber}<br />
                        Storage Space: {graphData.totalStorageSpaceInBytes / 1024 / 1024 / 1024} GB <br />
                        Free Space: {graphData.freeStorageSpaceInBytes / 1024 / 1024 / 1024} GB
                    </span>
                    }
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<SettingOutlined />}
                    title="Management"
                    description={<span>
                        Join Type: {graphData.joinType} <br />
                        Autopilot: {graphData.autopilotEnrolled.toString()}
                    </span>
                    }
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<DeploymentUnitOutlined />}
                    title="Operating System"
                    description={<span>
                        OS: {graphData.operatingSystem}<br />
                        Version: {graphData.osVersion} <br />
                        Edition: {graphData.skuFamily}
                    </span>}

                />
            </List.Item>
        </List>
    );
};