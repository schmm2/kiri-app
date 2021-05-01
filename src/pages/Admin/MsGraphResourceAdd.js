import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createMsGraphResource as createMsGraphResourceMutation } from "graphql/mutations";
import { Link } from "react-router-dom";

import { AutoForm } from 'uniforms-antd';
import { bridge as addMsGraphResourceSchema } from 'forms/msGraphResourceAdd';
import { Button } from "antd"

export default function MsGraphResourceAdd() {

    function createMsGraphResource(values) {
        console.log(values);

        API.graphql(
            graphqlOperation(createMsGraphResourceMutation, { input: values })
        ).then((result) => {
            console.log("successfull sent data");
            console.log(result);
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <div>
            <AutoForm schema={addMsGraphResourceSchema} onSubmit={createMsGraphResource} />
            <Button>
                <Link to={"/msGraphResources"}>Back</Link>
            </Button>
        </div>
    );
}
