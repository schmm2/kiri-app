import React from "react";
import { msGraphResourceCreateOne as msGraphResourceCreateOneMutation } from "graphql/mutations";
import { Link } from "react-router-dom";

import { AutoForm } from 'uniforms-antd';
import { bridge as addMsGraphResourceSchema } from 'forms/msGraphResourceAdd';
import { Button } from "antd"
import { gql, useMutation } from '@apollo/client';

export default function MsGraphResourceAdd() {

    const [createMsGraphResource, { data }] = useMutation(msGraphResourceCreateOneMutation);

    return (
        <div>
            <AutoForm schema={addMsGraphResourceSchema} onSubmit={
                data => { createMsGraphResource({ variables: { record: data } }) }
            } />
            <Button>
                <Link to={"/msGraphResources"}>Back</Link>
            </Button>
        </div>
    );
}
