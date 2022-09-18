import React from "react";
import { Link } from "react-router-dom";
import { AutoForm } from 'uniforms-antd';
import { bridge as addTenantSchema } from 'forms/tenantAdd';
import { Button } from "antd"
import { useMutation } from '@apollo/client';
import DefaultPage from '../../layouts/DefaultPage';
import { useHistory } from "react-router-dom";
import { CreateTenantDocument } from "generated";

export default function TenantAdd() {
  const history = useHistory();

  const [createTenant] = useMutation(CreateTenantDocument, {
    onCompleted(data) {
      console.log(data);
      history.push("/tenants");
    }
  });

  return (
    <DefaultPage>
      <AutoForm schema={addTenantSchema} onSubmit={
        data => {
          createTenant({ variables: { record: data } });
        }
      } />
      <Button>
        <Link to={"/tenants"}>Back</Link>
      </Button>
    </DefaultPage>
  );
}
