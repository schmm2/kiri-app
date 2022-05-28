import React from "react";
import { Link } from "react-router-dom";
import { AutoForm } from 'uniforms-antd';
import { bridge as addDeploymentSchema } from 'forms/deploymentAdd';
import { Button } from "antd";
import { deploymentCreateOne } from "graphql/mutations";
import { useMutation } from '@apollo/client';
import DefaultPage from '../../layouts/DefaultPage';
import { useNavigate } from "react-router-dom";

export default function DeploymentAdd() {
    const navigate = useNavigate();

    const [createDeployment] = useMutation(deploymentCreateOne, {
        onCompleted(data) {
            console.log(data);
            navigate("/deployments");
        }
    });

    return (
        <DefaultPage>
            <h1>Add Deployment</h1>
            {
                addDeploymentSchema &&
                <AutoForm schema={addDeploymentSchema}
                    onSubmit={data => { createDeployment({ variables: { record: data } }); }} />
            }
            <Button>
                <Link to={"/deployments"}>Back</Link>
            </Button>
        </DefaultPage>
    );
}
