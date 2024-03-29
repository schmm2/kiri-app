import React, { useEffect, useState } from "react"
import { Menu } from 'antd';
import {
  DesktopOutlined,
  SettingOutlined,
  HomeOutlined,
  FormOutlined,
  RightSquareOutlined,
  ExportOutlined,
  CloudOutlined
} from '@ant-design/icons';

import { Link, useLocation } from "react-router-dom";

const { SubMenu } = Menu;

export default function SideMenu(props) {
  const location = useLocation();
  const [selectedKeys, setKeys] = useState([]);

  useEffect(() => {
    let pathname = location.pathname;
    setKeys(pathname);
  }, [location]);

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} selectedKeys={selectedKeys}>
      <Menu.Item key="/home" icon={<HomeOutlined />}>
        <Link to="/home">
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="/memDevicesMenu" icon={<DesktopOutlined />}>
        <Link to="/memDevices">
          Devices
          </Link>
      </Menu.Item>
      <SubMenu key="/mem" icon={<FormOutlined />} title="Configurations">
        <Menu.Item key="/configurationprofile">
          <Link to="/configurationprofile">
            Configuration Profiles
          </Link>
        </Menu.Item>
        <Menu.Item key="/compliance">
          <Link to="/compliance">
            Compliance Profiles
          </Link>
        </Menu.Item>
        <Menu.Item key="/appprotection">
          <Link to="/appprotection">
            App Protection
          </Link>
        </Menu.Item>
        <Menu.Item key="/appconfiguration">
          <Link to="/appconfiguration">
            App Configuration
          </Link>
        </Menu.Item>
        <Menu.Item key="/enrollment">
          <Link to="/enrollment">
            Enrollment
          </Link>
        </Menu.Item>
        <Menu.Item key="/update">
          <Link to="/update">
            Update Ring
          </Link>
        </Menu.Item>
        <Menu.Item key="/autopilot">
          <Link to="/autopilot">
            Autopilot
          </Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="/scriptOverview" icon={<RightSquareOutlined />} title="Scripts">
        <Menu.Item key="/deviceManagementScript">
          <Link to="/deviceManagementScript">
            Powershell
          </Link>
        </Menu.Item>
        <Menu.Item key="/deviceHealthScript">
          <Link to="/deviceHealthScript">
            Proactive Remediation
          </Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="/deplyomentsMenu" icon={<ExportOutlined />} title="Deployments">
        <Menu.Item key="/deployments">
          <Link to="/deployments">
            Overview
          </Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="/tenantsMenu" icon={<CloudOutlined />} title="Tenants">
        <Menu.Item key="/tenants">
          <Link to="/tenants">
            Overview
          </Link>
        </Menu.Item>
        <Menu.Item key="/jobs">
          <Link to="/jobs">
            Jobs
          </Link>
        </Menu.Item>
        <Menu.Item key="/changeManagement">
          <Link to="/changeManagement">
            Change Management
        </Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="/adminMenu" icon={<SettingOutlined />} title="Admin">
        <Menu.Item key="/adminTools">
          <Link to="/adminTools">
            Tools
          </Link>
        </Menu.Item>
        <Menu.Item key="/configurationTypes">
          <Link to="/configurationTypes">
            Configurations Types
          </Link>
        </Menu.Item>
        <Menu.Item key="/msGraphResources">
          <Link to="/msGraphResources">
            Ms Graph Resources
          </Link>
        </Menu.Item>
        <Menu.Item key="/health">
          <Link to="/health">
            Health
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}