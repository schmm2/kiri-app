import React from 'react';
import { MemoryRouter, Route, Switch } from "react-router-dom";

// Layout
import Main from 'layouts/MainLayout';

// Pages
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Team from 'pages/Team';
import MEMDeviceConfigurations from 'pages/MEM/MEMDeviceConfigurations';
import MEMDeviceConfiguration from 'pages/MEM/MEMDeviceConfiguration';
import Tenants from 'pages/Tenants/Tenants';
import TenantAdd from 'pages/Tenants/TenantAdd';
import Jobs from 'pages/Jobs';
import MEMDevices from 'pages/MEM/MEMDevices';
import MEMConfigurations from 'pages/MEM/MEMConfigurations';
import ConfigurationTypes from 'pages/Admin/ConfigurationTypes';
import ConfigurationTypeAdd from 'pages/Admin/ConfigurationTypeAdd';
import MsGraphResources from 'pages/Admin/MsGraphResources';

// CSS
import '@aws-amplify/ui/dist/style.css';
import './App.css';

// Aws
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
// Get the aws resources configuration parameters
import awsconfig from './aws-exports'; // if you are using Amplify CLI

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} />
          <Route path="/msGraphResources" component={MsGraphResources} />
          <Route path="/configurationTypes" component={ConfigurationTypes} />
          <Route path="/configurationTypeAdd" component={ConfigurationTypeAdd} />
          <Route path="/memConfigurationProfiles">
            <MEMConfigurations title={"Configuration Profile"} category={'configurationprofile'} />
          </Route>
          <Route path="/memDeviceConfigurations/:deviceConfigurationId" component={MEMDeviceConfiguration} />
          <Route path="/memDevices" component={MEMDevices} />
          <Route path="/tenants" component={Tenants} />
          <Route path="/team" component={Team} />
          <Route path="/profile" component={Profile} />
          <Route path="/tenantAdd" component={TenantAdd} />
          <Route path="/jobs/:tenantId" component={Jobs} />
          <Route path="/jobs" component={Jobs} />
        </Switch>
      </Main>
    </div>
  );
}

//@ts-ignore
export default withAuthenticator(App, { includeGreetings: false });
