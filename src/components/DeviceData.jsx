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
import { osBuildToVersion } from "util/osBuildToVersion";

export const DeviceData = ({ deviceData }) => {
    console.log(deviceData)
    let graphData = deviceData;

    return (
        <List className="deviceData">
            <List.Item>
                <List.Item.Meta
                    avatar={<IdcardOutlined />}
                    title="General"
                    description={<span>
                        Device Name: {graphData.deviceName_s}
                    </span>}
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<SecurityScanOutlined />}
                    title="Security"
                    description={<span>
                        Compliance: {graphData.complianceState_s}<br />
                        Encrypted: {(graphData.isEncrypted_b).toString()} <br />
                    </span>}
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<UserOutlined />}
                    description={<span>
                        UPN: {graphData.userPrincipalName_s}
                    </span>}
                    title="User"
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<DesktopOutlined />}
                    title="Hardware"
                    description={<span>
                        Model: {graphData.model_s}<br />
                        Manufacturer: {graphData.manufacturer_s}<br />
                        SerialNumber: {graphData.serialNumber_s}<br />
                        Storage Space: {Math.floor(graphData.totalStorageSpaceInBytes_d / 1024 / 1024 / 1024)} GB <br />
                        Free Space: {Math.floor(graphData.freeStorageSpaceInBytes_d / 1024 / 1024 / 1024)} GB <br />
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
                        Join Type: {graphData.joinType_s} <br />
                        Autopilot: {(graphData.autopilotEnrolled_b).toString()}
                    </span>
                    }
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<DeploymentUnitOutlined />}
                    title="Operating System"
                    description={<span>
                        OS: {graphData.operatingSystem_s}<br />
                        Version: {osBuildToVersion(graphData.osVersion_s)} <br />
                        Build: {graphData.osVersion_s} <br />
                        Edition: {graphData.skuFamily_s}
                    </span>}
                />
            </List.Item>
        </List>
    );
};