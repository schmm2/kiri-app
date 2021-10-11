import React from "react";
import { Link } from "react-router-dom";
import { AutoForm } from 'uniforms-antd';
import { bridge as addDeploymentSchema } from 'forms/deploymentAdd';
import { Button } from "antd";
import { deploymentCreateOne } from "graphql/mutations";
import { useMutation } from '@apollo/client';
import DefaultPage from '../../layouts/DefaultPage';
import { useHistory } from "react-router-dom";

export default function DeploymentAdd() {
    const history = useHistory();

    const [createDeployment, deployment] = useMutation(deploymentCreateOne, {
        onCompleted(data) {
            console.log(data);
            history.push("/deployments");
        }
    });

    return (
        <DefaultPage>
            <AutoForm schema={addDeploymentSchema} onSubmit={
                data => {
                    createDeployment({ variables: { record: data } });
                }
            } />
            <Button>
                <Link to={"/deployments"}>Back</Link>
            </Button>
        </DefaultPage>
    );
}
