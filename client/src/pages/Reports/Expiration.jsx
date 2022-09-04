import React, { useContext, useEffect, useState } from "react";
import DefaultPage from '../../layouts/DefaultPage';
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { postBackendApi } from 'util/api';
import TenantContext from "components/TenantContext"
import { Table } from "antd";

export default function Expiration() {
  const selectedTenant = useContext(TenantContext);
  const [expirationData, setExpirationData] = useState(null);
  const [error, setError] = useState(null);
  const [awaitJob, setAwaitJob] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Type",
      dataIndex: "type"
    },
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "secretName",
      dataIndex: "secretName"
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate"
    },
    {
      title: "State",
      dataIndex: "state"
    },
  ];

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


  async function getExpiration(tenantDbId) {
    //console.log("update tenant data for tenantId: " + tenantDbId);
    openNotificationWithIcon('Pull Data', 'start Job', 'success');

    try {
      let response = await postBackendApi("orchestrators/ORC1005AzureExpirationCheck", { tenantDbId: tenantDbId })
      let job = await response.json();

      if (job.statusQueryGetUri) {
        openNotificationWithIcon('Pull Data', 'Job started', 'success');
        setAwaitJob(true)
        let loading = true

        while (loading) {
          console.log("query Status");

          let response = await fetch(job.statusQueryGetUri)
          let data = await response.json()

          if (data.runtimeStatus === "Completed") {
            setExpirationData(data.output)
            setAwaitJob(false)
            loading = false
            console.log(data.output);
          } else if (data.runtimeStatus === "Error") {
            setError("error in backend")
            setAwaitJob(false)
            loading = false
          }
          await sleep(5000)
        }
      }
    } catch (error) {
      openNotificationWithIcon('Pull Data', 'Job error', 'error');
      setError(error)
      setAwaitJob(false)
      // console.log(error)
    }
  }

  useEffect(() => {
    if (selectedTenant) {
      getExpiration(selectedTenant._id)
    }
  }, [selectedTenant]);

  return (
    <DefaultPage>
      <h1>Expiration</h1>
      <Table loading={awaitJob} rowKey="id" columns={columns} dataSource={expirationData}></Table>
      <a href="#" rel="noreferrer" onClick={() => getExpiration(selectedTenant._id)}>Pull Data</a>
    </DefaultPage>
  );
}

