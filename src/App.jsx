import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";

// Layout
import MainLayout from 'layouts/MainLayout';

// Pages
import Login from 'pages/Login'
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import MEMConfiguration from 'pages/MEM/MEMConfiguration';
import Tenants from 'pages/Tenants/Tenants';
import TenantAdd from 'pages/Tenants/TenantAdd';
import ChangeManagement from 'pages/Tenants/ChangeManagement';
import Jobs from 'pages/Tenants/Jobs';
import MEMDevices from 'pages/MEM/MEMDevices';
import MEMDevice from 'pages/MEM/MEMDevice';
import MEMConfigurations from 'pages/MEM/MEMConfigurations';
import ConfigurationTypes from 'pages/Admin/ConfigurationTypes';
import ConfigurationTypeAdd from 'pages/Admin/ConfigurationTypeAdd';
import MsGraphResources from 'pages/Admin/MsGraphResources';
import MsGraphResourceAdd from 'pages/Admin/MsGraphResourceAdd';
import TenantVerification from 'pages/Tenants/TenantVerification';
import AdminTools from 'pages/Admin/AdminTools';

// CSS
import './App.less';

// MSAL imports
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { CustomNavigationClient } from "./util/NavigationClient";
import Deployments from 'pages/Deplyoments/Deployments';
import DeploymentAdd from 'pages/Deplyoments/DeploymentAdd';
import Deployment from 'pages/Deplyoments/Deployment';
import Health from 'pages/Admin/Health';
import MEMConfigurationCompare from 'pages/MEM/MEMConfigurationCompare';
import Expiration from 'pages/Reports/Expiration';

function App({ pca }) {

  // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  const navigate = useNavigate();
  const navigationClient = new CustomNavigationClient(navigate);
  pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <AuthenticatedTemplate>
        <MainLayout>
          <Pages />
        </MainLayout>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
}

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="health" element={<Health />} />
      <Route path="home" element={<Home />} />
      <Route path="msGraphResources" element={<MsGraphResources />} />
      <Route path="msGraphResourceAdd" element={<MsGraphResourceAdd />} />
      <Route path="configurationTypes" element={<ConfigurationTypes />} />
      <Route path="configurationCompare/:configOne/:configTwo" element={<MEMConfigurationCompare />} />
      <Route path="configurationTypeAdd" element={<ConfigurationTypeAdd />} />
      <Route path="configurationprofile">
        <Route index={true} element={<MEMConfigurations title={"Configuration Profiles"} category={'configurationprofile'} />} />
        <Route path=":configurationId" element={<MEMConfiguration />} />
      </Route>
      <Route path="compliance">
        <Route index={true} element={<MEMConfigurations title={"Compliance"} category={'compliance'} />} />
        <Route path=":configurationId" element={<MEMConfiguration />} />
      </Route>
      <Route path="enrollment">
        <Route index={true} element={<MEMConfigurations title={"Enrollment"} category={'enrollment'} />} />
        <Route path=":configurationId" element={<MEMConfiguration />} />
      </Route>
      <Route path="appprotection">
        <Route index={true} element={<MEMConfigurations title={"App Protection"} category={'appprotection'} />} />
        <Route path=":configurationId" element={<MEMConfiguration />} />
      </Route>
      <Route path="appconfiguration">
        <Route index={true} element={<MEMConfigurations title={"App Configuration"} category={'appconfiguration'} />} />
        <Route path=":configurationId" element={<MEMConfiguration />} />
      </Route>
      <Route path="update">
        <Route index={true} element={<MEMConfigurations title={"Update Ring"} category={'update'} />} />
        <Route path=":configurationId" element={<MEMConfiguration />} />
      </Route>
      <Route path="autopilot">
        <Route index={true} element={<MEMConfigurations title={"Autopilot"} category={'autopilot'} />} />
        <Route path=":configurationId" element={<MEMConfiguration />} />
      </Route>
      <Route path="deviceManagementScript">
        <Route index={true} element={<MEMConfigurations title={"Powershell"} category={'deviceManagementScript'} />} />
        <Route path=":configurationId" element={<MEMConfiguration />} />
      </Route>
      <Route path="deviceHealthScript">
        <Route index={true} element={<MEMConfigurations title={"Proactive Remediation"} category={'deviceHealthScript'} />} />
        <Route path=":configurationId" element={<MEMConfiguration />} />
      </Route>
      <Route path="memDevices">
        <Route index={true} element={<MEMDevices />} />
        <Route path=":deviceId" element={<MEMDevice />} />
      </Route>
      <Route path="endpointSecurity">
        <Route index={true} element={<MEMConfigurations title={"Endpoint Security"} category={'endpointSecurity'} />} />
        <Route path=":configurationId" element={<MEMConfiguration />} />
      </Route>
      <Route path="expiration" element={<Expiration />} />
      <Route path="deploymentAdd" element={<DeploymentAdd />} />
      <Route path="deployments">
        <Route index={true} element={<Deployments />} />
        <Route path=":deploymentId" element={<Deployment />} />
      </Route>
      <Route path="tenantAdd" element={<TenantAdd />} />
      <Route path="tenants" element={<Tenants />} />
      <Route path="profile" element={<Profile />} />
      <Route path="changeManagement" element={<ChangeManagement />} />
      <Route path="jobs">
        <Route index={true} element={<Jobs />} />
        <Route path=":tenantId" element={<Jobs />} />
      </Route>
      <Route path="adminTools" element={<AdminTools />} />
      <Route path="tenantverification" element={<TenantVerification />} />
    </Routes>
  )
}

//@ts-ignore
export default App;
