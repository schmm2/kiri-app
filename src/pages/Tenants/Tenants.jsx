import React, { useState } from "react";
import { tenantMany, msGraphResourceMany } from "graphql/queries";
import { tenantRemoveById } from "graphql/mutations";
import { Link } from "react-router-dom";
import { openNotificationWithIcon } from "util/openNotificationWithIcon";
import { useQuery, useMutation } from '@apollo/client';
import { postBackendApi } from 'util/api';
import { AddToDeploymentModal } from "components/AddToDeploymentModal";
import { deploymentUpdateOne as deploymentUpdateOneMutation } from "graphql/mutations"

// antd components
import { Table, Button, Space, Menu, Dropdown } from "antd";
import {
  PlusOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from "@ant-design/icons";

var fileDownload = require('js-file-download');

export default function Tenants() {
  const { loading, error, data } = useQuery(tenantMany, {
    fetchPolicy: "cache-and-network"
  });

  const { loading: loadingMsGraphResource, error: errorMsGraphResource, data: dataMsGraphResource } = useQuery(msGraphResourceMany, {
    fetchPolicy: "cache-and-network",
    onCompleted: (dataMsGraphResource) => { console.log(dataMsGraphResource) }
  });

  // states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedTenants, setSelectedTenants] = useState([]);

  function openModal() {
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  const [deleteTenant] = useMutation(tenantRemoveById, {
    onCompleted(data) {
      // console.log(data);
      if (!data.tenantRemoveById) {
        openNotificationWithIcon('Delete', 'error deleting object', 'error');
      }
    }
  });

  const msGraphResourceMenu = (tenantDbId) => (
  
      <Menu>
        <Menu.Item key={"all"} onClick={() => triggerTenantUpdate(tenantDbId)}>All Resources</Menu.Item>
        {dataMsGraphResource && dataMsGraphResource.msGraphResourceMany && dataMsGraphResource.msGraphResourceMany.map((msGraphResource, index) => {
          return (
            <Menu.Item key={msGraphResource._id} onClick={() => triggerTenantUpdate(tenantDbId, msGraphResource._id)}>
              <span>{msGraphResource.name}</span>
            </Menu.Item>
          )
        })}
      </Menu>
    
  );

  async function triggerTenantUpdate(tenantDbId, msGraphResourceDbIdFilter = "") {
    //console.log("update tenant data for tenantId: " + tenantDbId);
    openNotificationWithIcon('Pull Data', 'start Job', 'success');

    postBackendApi("orchestrators/ORC1000AzureDataCollect", { tenantDbId: tenantDbId, msGraphResourceDbIdFilter: msGraphResourceDbIdFilter })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        openNotificationWithIcon('Pull Data', 'Job started', 'success');
      }).catch((error) => {
        openNotificationWithIcon('Pull Data', 'Job error', 'error');
        console.log(error);
      });
  }

  
  async function triggerTest(tenantDbId) {
    //console.log("update tenant data for tenantId: " + tenantDbId);
    openNotificationWithIcon('Pull Data', 'start Job', 'success');

    postBackendApi("orchestrators/ORC5101MEMConfigurationCreateTest", { tenantDbId: tenantDbId})
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        openNotificationWithIcon('Pull Data', 'Job started', 'success');
      }).catch((error) => {
        openNotificationWithIcon('Pull Data', 'Job error', 'error');
        console.log(error);
      });
  }

  async function triggerDataCheck(tenantDbId) {
    //console.log("update tenant data for tenantId: " + tenantDbId);
    openNotificationWithIcon('Check Data', 'start Job', 'success');

    postBackendApi("orchestrators/ORC1400AzureCheckDataConsistencyInDB", { tenantDbId: tenantDbId })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        openNotificationWithIcon('Check Data', 'Job started', 'success');
      }).catch((error) => {
        openNotificationWithIcon('Check Data', 'Job error', 'error');
        console.log(error);
      });
  }


  async function triggerBackup(tenantDbId) {
    let fileName = "export.zip";
    // console.log("backup config for tenant " + tenantDbId);
    openNotificationWithIcon('Backup', 'Backup Job started', 'success', 8.0);

    postBackendApi("TRG2000ConfigurationBackupCreate", { tenantDbId: tenantDbId })
      .then(response => {
        let contentDisposition = response.headers.get('Content-Disposition')
        // console.log(contentDisposition);
        if (contentDisposition) {
          fileName = contentDisposition.split('filename=')[1]
          // console.log(fileName)
        }
        // read blob data
        return response.blob()
      })
      .then(data => {
        openNotificationWithIcon('Backup', 'Backup created successfully, start download', 'success')
        fileDownload(data, fileName);
      }).catch((error) => {
        openNotificationWithIcon('Backup', error, 'error')
        console.log(error);
      });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Tenant ID",
      dataIndex: "tenantId",
    },
    {
      title: "Verified",
      key: "verified",
      render: (text, record) => (
        <Space size="middle">
          {
            record.verified ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#ff0000" />
            )
          }
        </Space>
      ),
    },
    {
      title: 'Pull Data',
      key: 'pulldata',
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={msGraphResourceMenu(record._id)}>
            <a onClick={e => e.preventDefault()}>Pull Data</a>
          </Dropdown>
        </Space>
      )
    },
    {
      title: 'Other Actions',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="#" rel="noreferrer" onClick={() => triggerBackup(record._id)}>Download last Backup</a>
          <a rel={'external'} rel="noreferrer" target="_blank" href={"https://login.microsoftonline.com/" + record.tenantId + "/adminconsent?client_id=" + record.appId}>Grant Permission</a>
          <a href="#" rel="noreferrer" onClick={() => triggerDataCheck(record._id)}>Check Data</a>
          <a href="#" rel="noreferrer" onClick={() => triggerTest(record._id)}>Test</a>
          <a href="#" rel="noreferrer" onClick={() => {
            deleteTenant({
              variables: { id: record._id },
              refetchQueries: [
                { query: tenantMany }
              ]
            });
          }}>Delete</a>
        </Space>
      ),
    }
  ];


  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const [updateDeployment] = useMutation(deploymentUpdateOneMutation, {
    onCompleted(data) {
      console.log(data);
      openNotificationWithIcon('Add to Deployment', 'success', 'success');
    }, onError(error) {
      openNotificationWithIcon('Add to Deployment', 'error', 'error');
      console.log(error)
    }
  });

  function addToDeployment(data) {
    let deploymentTenantIds = data.tenants.map(tenant => tenant._id);
    // console.log(deploymentTenantIds);
    let tenantIdsToAddToDeployment = selectedTenants.filter(id => deploymentTenantIds.indexOf(id) === -1);
    // console.log(tenantIdsToAddToDeployment);
    let finalTenantIds = deploymentTenantIds.concat(tenantIdsToAddToDeployment);
    // console.group(finalTenantIds);

    // update deployment if new configVersions have been found
    if (tenantIdsToAddToDeployment.length > 0) {
      let parameter = {
        variables: {
          record: { tenants: finalTenantIds },
          filter: { _id: data._id }
        }
      }
      // console.log(parameter);
      updateDeployment(parameter);
    } else {
      openNotificationWithIcon('Add to Deployment', 'no action taken, already assigned', 'success');
    }
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
      setSelectedTenants(selectedRowKeys);
    }
  };

  return (
    <div className="defaultPage">
      <AddToDeploymentModal
        showModal={isModalVisible}
        onClose={closeModal}
        onAdd={addToDeployment}
      />
      <h1>Tenants</h1>
      <div className="controlTop">
        <Space align="end">
          <Button disabled={selectedRows.length === 0} onClick={openModal}>+ Deployment</Button>
        </Space>
      </div>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        loading={loading}
        rowKey="_id"
        columns={columns}
        dataSource={data && data.tenantMany}
        onChange={onChange} />
      <Button>
        <Link to="/tenantAdd">
          <PlusOutlined /> Add Tenant
        </Link>
      </Button>
    </div>
  )
}
