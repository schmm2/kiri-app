import React from "react";
import { createTenant as createTenantMutation } from "graphql/mutations";
import { Link } from "react-router-dom";

import { AutoForm } from 'uniforms-antd';
import { bridge as addTenantSchema } from 'forms/tenantAdd';
import { Button } from "antd"

export default function Tenants() {
  
  function createTenant(values) {
    // console.log(values);
    
    /*API.graphql(
      graphqlOperation(createTenantMutation, { input: values })
    ).then((result) =>{
      console.log("successfull sent data");
      console.log(result);
    }).catch(e =>{
      console.log(e);
    });*/
  }

  return (
    <div>
      <AutoForm schema={addTenantSchema} onSubmit={createTenant} />
      <Button>
        <Link to={"/tenants"}>Back</Link>
      </Button>
    </div>
  );
}
