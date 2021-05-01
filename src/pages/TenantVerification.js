import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { triggerTenantVerification as triggerTenantMutation } from "graphql/mutations";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";

export default function TenantVerification() {
    let query = new URLSearchParams(useLocation().search);

    const [azureTenantId, setAzureTenantId] = useState();
    const [isVerified, setVerification] = useState(false);

    useEffect(() => {
        let azureTenantId = query.get("tenant");
        let adminConsent = query.get("admin_consent");

        /*console.log("admin consent");
        console.log(adminConsent);
        console.log("tenant");
        console.log(azureTenantId);*/

        triggerTenantVerification(adminConsent, azureTenantId);
    }, []);

    async function triggerTenantVerification(adminConsent, azureTenantId) {
        if (adminConsent && azureTenantId) {
            setAzureTenantId(azureTenantId);

            // console.log(adminConsent);
            // console.log(azureTenantId);
            
            try {
                let response = await API.graphql(graphqlOperation(triggerTenantMutation, { tenantId: azureTenantId }));
                console.log(response);

                if (response.data && response.data.triggerTenantVerification) {
                    let triggerTenantVerificationResponse = (JSON.parse(response.data.triggerTenantVerification)).body;
                    if (triggerTenantVerificationResponse && triggerTenantVerificationResponse.ok === true) {
                        setVerification(true);
                    } else {
                        setVerification(false);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    }


    return (
        <div>
            <h1>Tenant Verification</h1>
            <p>Tenant { azureTenantId }</p>
            <p>isVerified { isVerified.toString() }</p>
        </div>
    );
}

