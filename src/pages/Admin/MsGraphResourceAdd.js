import React from "react";
import { msGraphResourceCreateOne as msGraphResourceCreateOneMutation } from "graphql/mutations";
import { Link } from "react-router-dom";

import { AutoForm } from 'uniforms-antd';
import { bridge as addMsGraphResourceSchema } from 'forms/msGraphResourceAdd';
import { Button } from "antd"
import { gql, useMutation } from '@apollo/client';
import DefaultPage from '../../layouts/DefaultPage';
import { useHistory } from "react-router-dom";

export default function MsGraphResourceAdd() {
    const history = useHistory();

    const [createMsGraphResource, msGraphResource] = useMutation(msGraphResourceCreateOneMutation, {
        onCompleted(data) {
            console.log(data);
            history.push("/msGraphResources");
        }
    });

    return (
        <DefaultPage>
            <AutoForm schema={addMsGraphResourceSchema} onSubmit={
                data => { createMsGraphResource({ variables: { record: data } }) }
            } />
            <Button>
                <Link to={"/msGraphResources"}>Back</Link>
            </Button>
        </DefaultPage>
    );
}
