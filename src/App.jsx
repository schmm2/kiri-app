import React from 'react';
import { Route, Switch, useHistory } from "react-router-dom";

// Layout
import MainLayout from 'layouts/MainLayout';

// Pages
import Login from 'pages/Login'
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Team from 'pages/Team';
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

function App({ pca }) {

  // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  const history = useHistory();
  const navigationClient = new CustomNavigationClient(history);
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
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/health" component={Health} />
      <Route path="/home" component={Home} />
      <Route path="/msGraphResources" component={MsGraphResources} />
      <Route path="/msGraphResourceAdd" component={MsGraphResourceAdd} />
      <Route path="/configurationTypes" component={ConfigurationTypes} />
      <Route path="/configurationTypeAdd" component={ConfigurationTypeAdd} />
      <Route path="/configurationprofile/:configurationId" component={MEMConfiguration} />
      <Route path="/configurationprofile">
        <MEMConfigurations title={"Configuration Profiles"} category={'configurationprofile'} />
      </Route>
      <Route path="/compliance/:configurationId" component={MEMConfiguration} />
      <Route path="/compliance">
        <MEMConfigurations title={"Compliance"} category={'compliance'} />
      </Route>
      <Route path="/enrollment/:configurationId" component={MEMConfiguration} />
      <Route path="/enrollment">
        <MEMConfigurations title={"Enrollment"} category={'enrollment'} />
      </Route>
      <Route path="/appprotection/:configurationId" component={MEMConfiguration} />
      <Route path="/appprotection">
        <MEMConfigurations title={"App Protection"} category={'appprotection'} />
      </Route>
      <Route path="/appconfiguration/:configurationId" component={MEMConfiguration} />
      <Route path="/appconfiguration">
        <MEMConfigurations title={"App Configuration"} category={'appconfiguration'} />
      </Route>
      <Route path="/update/:configurationId" component={MEMConfiguration} />
      <Route path="/update">
        <MEMConfigurations title={"Update Ring"} category={'update'} />
      </Route>
      <Route path="/autopilot/:configurationId" component={MEMConfiguration} />
      <Route path="/autopilot">
        <MEMConfigurations title={"Autopilot"} category={'autopilot'} />
      </Route>
      <Route path="/deviceManagementScript/:configurationId" component={MEMConfiguration} />
      <Route path="/deviceManagementScript">
        <MEMConfigurations title={"Powershell"} category={'deviceManagementScript'} />
      </Route>
      <Route path="/deviceHealthScript/:configurationId" component={MEMConfiguration} />
      <Route path="/deviceHealthScript">
        <MEMConfigurations title={"Proactive Remediation"} category={'deviceHealthScript'} />
      </Route>
      <Route path="/memDevices/:deviceId" component={MEMDevice} />
      <Route path="/memDevices" component={MEMDevices} />
      <Route path="/deploymentAdd" component={DeploymentAdd} />
      <Route path="/deployments/:deploymentId" component={Deployment} />
      <Route path="/deployments" component={Deployments} />
      <Route path="/tenantAdd" component={TenantAdd} />
      <Route path="/tenants" component={Tenants} />
      <Route path="/team" component={Team} />
      <Route path="/profile" component={Profile} />   
      <Route path="/changeManagement" component={ChangeManagement} />
      <Route path="/jobs/:tenantId" component={Jobs} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/adminTools" component={AdminTools} />
      <Route path="/tenantverification" component={TenantVerification} />
    </Switch>
  )
}

//@ts-ignore
export default App;
