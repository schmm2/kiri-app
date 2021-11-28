import React, { useState, useEffect } from "react"
import DefaultPage from '../layouts/DefaultPage';
import { callMsGraphProfile } from "../util/MsGraphProfileApiCall";

// Msal imports
import { useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";
import { ProfileData } from "components/ProfileData";

export default function Profile() {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState < null | GraphData > (null);

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      callMsGraphProfile().then(response => { console.log(response); setGraphData(response) }).catch((e) => {
        if (e instanceof InteractionRequiredAuthError) {
          instance.acquireTokenRedirect({
            ...loginRequest,
            account: instance.getActiveAccount()
          });
        }
      });
    }
  }, [inProgress, graphData, instance]);

  return (
    <DefaultPage>
      { graphData ? <ProfileData graphData={graphData} /> : null}
    </DefaultPage>
  );
}