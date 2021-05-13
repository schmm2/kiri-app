import React from 'react';
import { Route, Switch } from "react-router-dom";

// Layout
import Main from 'layouts/MainLayout';

// Pages
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Team from 'pages/Team';
import MEMConfiguration from 'pages/MEM/MEMConfiguration';
import Tenants from 'pages/Tenants';
import TenantAdd from 'pages/TenantAdd';
import Jobs from 'pages/Jobs';
import MEMDevices from 'pages/MEM/MEMDevices';
import MEMConfigurations from 'pages/MEM/MEMConfigurations';
import ConfigurationTypes from 'pages/Admin/ConfigurationTypes';
import ConfigurationTypeAdd from 'pages/Admin/ConfigurationTypeAdd';
import MsGraphResources from 'pages/Admin/MsGraphResources';
import MsGraphResourceAdd from 'pages/Admin/MsGraphResourceAdd';
import TenantVerification from 'pages/TenantVerification';

// CSS
import './App.less';

function App() {
  return (
    <div className="App">
      <Main>
        <Switch>
          <Route path="/" component={Home} exact />
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
          <Route path="/updatering/:configurationId" component={MEMConfiguration} />
          <Route path="/updatering">
            <MEMConfigurations title={"Update Ring"} category={'updatering'} />
          </Route>
          <Route path="/autopilot">
            <MEMConfigurations title={"Autopilot"} category={'autopilot'} />
          </Route>
          <Route path="/memDevices" component={MEMDevices} />
          <Route path="/tenants" component={Tenants} />
          <Route path="/team" component={Team} />
          <Route path="/profile" component={Profile} />
          <Route path="/tenantAdd" component={TenantAdd} />
          <Route path="/jobs/:tenantId" component={Jobs} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/tenantverification" component={TenantVerification} />
        </Switch>
      </Main>
    </div>
  );
}

//@ts-ignore
export default App;
