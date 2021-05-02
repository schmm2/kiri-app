import React from "react";
import { Link } from "react-router-dom";
import { AutoForm } from 'uniforms-antd';
import { bridge as addTenantSchema } from 'forms/tenantAdd';
import { Button } from "antd"
import { tenantCreateOne } from "graphql/mutations";
import { gql, useMutation } from '@apollo/client';

export default function Tenants() {
  const [createTenant, tenant] = useMutation(tenantCreateOne);

  return (
    <div>
      <AutoForm schema={addTenantSchema} onSubmit={
        data => { createTenant({ variables: { record: data } }) }
      } />
      <Button>
        <Link to={"/tenants"}>Back</Link>
      </Button>
    </div>
  );
}
