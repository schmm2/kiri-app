import React, { useEffect, useReducer } from "react"
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd';
import {
  BellOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';

import { Link } from "react-router-dom";
import SideMenu from "components/SideMenu";
import { listTenants } from "graphql/queries";
import TenantContext from 'components/TenantContext';

import './MainLayout.css'

const { Sider, Content, Header } = Layout;

export default function MainLayout(props) {

  const initialState = {
    loading: true,
    collapsed: false,
    tenants: [],
    selectedTenant: null,
    error: false
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_TENANTS':
        return { ...state, tenants: action.tenants, loading: false }
      case 'SET_SELECTEDTENANT':
        return { ...state, selectedTenant: action.selectedTenant }
      case 'TOGGLE_COLLAPSE':
        return { ...state, collapsed: !state.collapsed }
      case 'ERROR':
        return { ...state, loading: false, error: true }
      default:
        return state
    }
  }

  async function fetchTenants() {
    /*
    //console.log(props);
    try {
      let tenantData = await API.graphql(graphqlOperation(listTenants));
      tenantData = tenantData.data.listTenants.items;
      dispatch({ type: 'SET_TENANTS', tenants: tenantData })

      // if availble set first tenant as selected
      if (tenantData.length > 0) {
        dispatch({ type: 'SET_SELECTEDTENANT', selectedTenant: tenantData[0] })
      }
    } catch (err) {
      console.error("error fetching tenants");
      console.log(err);
      dispatch({ type: 'ERROR' })
    }*/
  }

  async function signOut() {
    try {
      //await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  useEffect(() => {
    fetchTenants();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  const tenantMenu = (
    <Menu>
      {state.tenants.map((tenant, index) => {
        return (
          <Menu.Item key={tenant.id} onClick={() => dispatch({ type: 'SET_SELECTEDTENANT', selectedTenant: tenant })}>
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