import { CosmosClient } from "@azure/cosmos";
import { TenantDataSource as CosmosTenantDataSource } from "./cosmos/TenantDataSource";
import { ConfigurationDataSource as CosmosConfigurationDataSource } from "./cosmos/ConfigurationDataSource";
import { MsGraphResourceDataSource as CosmosMsGraphResourceDataSource } from "./cosmos/MsGraphResourceDataSource";
import { ConfigurationVersionDataSource as CosmosConfigurationVersionDataSource } from "./cosmos/ConfigurationVersionDataSource";
import { ConfigurationTypeDataSource as CosmosConfigurationTypeDataSource } from "./cosmos/ConfigurationTypeDataSource";
import { DeviceDataSource as CosmosDeviceDataSource } from "./cosmos/DeviceDataSource";
import { DeviceWarrantyDataSource as CosmosDeviceWarrantyDataSource } from "./cosmos/DeviceWarrantyDataSource";
import { DeviceVersionDataSource as CosmosDeviceVersionDataSource } from "./cosmos/DeviceVersionDataSource";
import { JobDataSource as CosmosJobDataSource } from "./cosmos/JobsDataSource"; 
import { DeploymentDataSource as CosmosDeploymentDataSource } from "./cosmos/DeploymentDataSource";

export const cosmosDataSources = () => {

  if(!process.env.CosmosDB || process.env.CosmosDB.length === 0) throw new Error("CosmosDB connection string not found.");

  const client = new CosmosClient(process.env.CosmosDB);
  const tenantContainer = client.database("kiri").container("tenant");
  const configurationContainer = client.database("kiri").container("configuration");
  const deviceContainer = client.database("kiri").container("device");
  const msGraphResourceContainer = client.database("kiri").container("msGraphResource");
  const jobContainer = client.database("kiri").container("job");
  const deploymentContainer = client.database("kiri").container("deployment");

  return {
    tenant: new CosmosTenantDataSource(tenantContainer),
    configuration: new CosmosConfigurationDataSource(configurationContainer),
    configurationVersion: new CosmosConfigurationVersionDataSource(configurationContainer),
    configurationType: new CosmosConfigurationTypeDataSource (configurationContainer),
    device: new CosmosDeviceDataSource(deviceContainer),
    deviceWarranty: new CosmosDeviceWarrantyDataSource(deviceContainer),
    deviceVersion: new CosmosDeviceVersionDataSource(deviceContainer),
    msGraphResource: new CosmosMsGraphResourceDataSource(msGraphResourceContainer),
    job: new CosmosJobDataSource(jobContainer),
    deployment: new CosmosDeploymentDataSource(deploymentContainer),
  };
};
