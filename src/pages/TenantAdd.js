import React from "react";
import { Link } from "react-router-dom";
import { AutoForm } from 'uniforms-antd';
import { bridge as addTenantSchema } from 'forms/tenantAdd';
import { Button } from "antd"
import { tenantCreateOne } from "graphql/mutations";
import { gql, useMutation } from '@apollo/client';
import DefaultPage from '../layouts/DefaultPage';

export default function Tenants() {
  const [createTenant, tenant] = useMutation(tenantCreateOne);

  return (
    <DefaultPage>
      <AutoForm schema={addTenantSchema} onSubmit={
        data => { createTenant({ variables: { record: data } }) }
      } />
      <Button>
        <Link to={"/tenants"}>Back</Link>
      </Button>
    </DefaultPage>
  );
}
