import React, { useReducer } from "react"
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd';
import {
  BellOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';

import { Link } from "react-router-dom";
import SideMenu from "components/SideMenu";
import TenantContext from 'components/TenantContext';

import { useQuery } from '@apollo/client';
import { tenantMany } from "graphql/queries";

import './MainLayout.css'

const { Sider, Content, Header } = Layout;

export default function MainLayout(props) {

  const { data, tenantsLoading, tenantsError } = useQuery(tenantMany, {
    onCompleted: data => {
      console.log('data', data.tenantMany);
      // if availble set first tenant as selected
      if (data.tenantMany.length > 0) {
        dispatch({ type: 'SET_SELECTEDTENANT', selectedTenant: data.tenantMany[0] })
      }
    }
  });

  const initialState = {
    loading: true,
    collapsed: false,
    selectedTenant: null,
    error: false
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_SELECTEDTENANT':
        console.log('selected-tenant', action.selectedTenant)
        return { ...state, selectedTenant: action.selectedTenant }
      case 'TOGGLE_COLLAPSE':
        return { ...state, collapsed: !state.collapsed }
      case 'ERROR':
        return { ...state, loading: false, error: true }
      default:
        return state
    }
  }

  async function signOut() {
    try {
      //await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const tenantMenu = (
    <Menu>
      {data && data.tenantMany && data.tenantMany.map((tenant, index) => {
        return (
          <Menu.Item key={tenant._id} onClick={() => dispatch({ type: 'SET_SELECTEDTENANT', selectedTenant: tenant })}>
            <span>{tenant.name}</span>
          </Menu.Item>
        )
      })}
    </Menu>
  );

  const accountMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="signout">
        <Link onClick={() => signOut()}>Sign out</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="logo" />
        <SideMenu></SideMenu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => { dispatch({ type: 'TOGGLE_COLLAPSE' }) },
          })}
          <Menu id="headerMenu">
            <Dropdown overlay={tenantMenu} placement="bottomRight">
              <Button ghost>{
                state.selectedTenant ? state.selectedTenant.name : 'Tenant'
              }</Button>
            </Dropdown>
            <Menu.Item key="mail" icon={<BellOutlined />}>
              <Link to="/jobs"></Link>
            </Menu.Item>
            <Dropdown overlay={accountMenu} placement="bottomRight">
              <Avatar shape="square" icon={<UserOutlined />} />
            </Dropdown>
          </Menu>
        </Header>
        <Content className="site-content">
          <TenantContext.Provider value={state.selectedTenant}>
            {props.children}
          </TenantContext.Provider>
        </Content>
      </Layout>
    </Layout>
  );
}