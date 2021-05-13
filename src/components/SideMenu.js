import React, { useEffect, useState } from "react"
import { Menu } from 'antd';
import {
  DesktopOutlined,
  ApartmentOutlined,
  SettingOutlined,
  HomeOutlined,
  FormOutlined
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
      <Menu.Item key="/memDevices" icon={<DesktopOutlined />}>
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
        <Menu.Item key="/updatering">
          <Link to="/updatering">
            Update Ring
          </Link>
        </Menu.Item>
        <Menu.Item key="/autopilot">
          <Link to="/autopilot">
            Autopilot
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/tenants" icon={<ApartmentOutlined />}>
        <Link to="/tenants">
          Tenants
        </Link>
      </Menu.Item>
      <SubMenu key="/admin" icon={<SettingOutlined />} title="Admin">
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
      </SubMenu>
    </Menu>
  );

}

