import React from "react"
import { List } from 'antd';
import {
    UserOutlined,
    IdcardOutlined,
    DesktopOutlined,
    SettingOutlined,
    DeploymentUnitOutlined,
    SecurityScanOutlined
} from '@ant-design/icons';
import { renderDate } from 'util/renderDate'

export const DeviceData = ({ deviceData }) => {
    console.log(deviceData)
    let graphData = JSON.parse(deviceData.newestDeviceVersions[0].value);

    return (
        <List className="deviceData">
            <List.Item>
                <List.Item.Meta
                    avatar={<IdcardOutlined />}
                    title="General"
                    description={<span>
                        Device Name: {graphData.deviceName}
                    </span>}
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<SecurityScanOutlined />}
                    title="Security"
                    description={<span>
                        Compliance: {graphData.complianceState}<br />
                        Encrypted: {(graphData.isEncrypted).toString()} <br />
                    </span>}
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<UserOutlined />}
                    description={<span>
                        UPN: {graphData.userPrincipalName}
                    </span>}
                    title="User"
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<DesktopOutlined />}
                    title="Hardware"
                    description={<span>
                        Model: {graphData.model}<br />
                        Manufacturer: {graphData.manufacturer}<br />
                        SerialNumber: {graphData.serialNumber}<br />
                        Storage Space: {Math.floor(graphData.totalStorageSpaceInBytes / 1024 / 1024 / 1024)} GB <br />
                        Free Space: {Math.floor(graphData.freeStorageSpaceInBytes / 1024 / 1024 / 1024)} GB <br />
                        {
                            deviceData.deviceWarranty &&
                            <span>
                                Warranty Start: {deviceData.deviceWarranty && renderDate(deviceData.deviceWarranty.startDate)} <br />
                                Warranty End: {deviceData.deviceWarranty && renderDate(deviceData.deviceWarranty.endDate)}
                            </span>
                        }
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
                        Version: {deviceData.osVersionName} <br />
                        Build: {graphData.osVersion} <br />
                        Edition: {graphData.skuFamily}
                    </span>}
                />
            </List.Item>
        </List>
    );
};