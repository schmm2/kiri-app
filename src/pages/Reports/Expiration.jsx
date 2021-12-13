import React, { useContext } from "react";
import DefaultPage from '../../layouts/DefaultPage';
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { postBackendApi } from 'util/api';
import TenantContext from "components/TenantContext"

async function getExpiration(tenantDbId) {
  //console.log("update tenant data for tenantId: " + tenantDbId);
  openNotificationWithIcon('Pull Data', 'start Job', 'success');

  postBackendApi("orchestrators/ORC1005AzureExpirationCheck", { tenantDbId: tenantDbId })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      openNotificationWithIcon('Pull Data', 'Job started', 'success');
    }).catch((error) => {
      openNotificationWithIcon('Pull Data', 'Job error', 'error');
      console.log(error);
    });
}

export default function Expiration() {
  const selectedTenant = useContext(TenantContext);
  
  return (
    <DefaultPage>
      <h1>Expiration</h1>
      <a href="#" rel="noreferrer" onClick={() => getExpiration(selectedTenant._id)}>Pull Data</a>
    </DefaultPage>
  );
}

