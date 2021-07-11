import React, { useEffect, useState } from "react"
import { tenantVerify as tenantVerifyMutation } from "graphql/mutations"
import { Link, useLocation, useHistory, BrowserRouter as Router } from "react-router-dom"
import DefaultPage from '../layouts/DefaultPage'
import { useMutation } from '@apollo/client';
import { openNotificationWithIcon } from "util/openNotificationWithIcon";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function TenantVerification() {
    let query = useQuery();
    const history = useHistory();

    const [error, setError] = useState()

    const [verifiyTenant, { data }] = useMutation(tenantVerifyMutation, {
        onError: (err) => {
            setError({
                title: "GraphQL Error",
                description: err.toString()
            });
        },
        onCompleted(data) {
            if (data.tenantUpdateOne && data.tenantUpdateOne.record) {
                let record = data.tenantUpdateOne.record;
                console.log(record);
                if (record.verified) {
                    // tenant verified status was updated in backend
                    openNotificationWithIcon('Tenant Verification', 'verified', 'success');
                    history.push("/tenants");
                }
                else {
                    // something went wrong updating the tenant status in the backend
                    openNotificationWithIcon('Tenant Verification', 'error', 'error');
                }
            }
        }
    });

    useEffect(() => {
        let error = query.get("error")

        if (error) {
            // something went wrong during azure workflow or user canceled
            let errorDescription = query.get("error_description")
            setError({
                title: error,
                description: errorDescription
            });
        } else {
            console.log("tenant verification successful")
            let azureTenantId = query.get("tenant")
            verifiyTenant({ variables: { tenantId: azureTenantId, verified: true } })
        }
    }, []);

    if (error) return (
        <DefaultPage>
            <h1>Granting access failed</h1>
            <p>error: {error.title}</p>
            <p>description: {error.description}</p>
        </DefaultPage>
    )

    return (
        <DefaultPage>
            <h1>Granting access successfully</h1>
        </DefaultPage>
    );
}

