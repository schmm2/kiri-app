import React from "react"
import { List } from 'antd';
import {
    UserOutlined,
    MailOutlined
  } from '@ant-design/icons';

export const ProfileData = ({ graphData }) => {
    return (
        <List className="profileData">
            <List.Item>
                <List.Item.Meta
                    avatar={<UserOutlined />}
                    description={<span>{graphData.displayName}</span>}
                />
            </List.Item>
            <List.Item>
                <List.Item.Meta
                    avatar={<MailOutlined />}
                    description={<span>{graphData.mail}</span>}
                />
            </List.Item>
        </List>
    );
};