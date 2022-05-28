import React, { useState, useEffect } from "react"
import DefaultPage from '../layouts/DefaultPage';
import { getMsGraphProfile } from "../util/api";

// Msal imports
import { useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
import { ProfileData } from "components/ProfileData";

export default function Profile() {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState < null | graphData > (null);

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      getMsGraphProfile()
        .then(response => {
          console.log(response); setGraphData(response)
        });
    }
  }, [inProgress, graphData, instance]);

  return (
    <DefaultPage>
      { graphData ? <ProfileData graphData={graphData} /> : null}
    </DefaultPage>
  );
}