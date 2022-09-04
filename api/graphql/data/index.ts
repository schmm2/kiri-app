import { CosmosClient } from "@azure/cosmos";
import { TenantDataSource as CosmosTenantDataSource } from "./cosmos/TenantDataSource";
import { ConfigurationDataSource as CosmosConfigurationDataSource } from "./cosmos/ConfigurationDataSource";
import { MsGraphResourceDataSource as CosmosMsGraphResourceDataSource } from "./cosmos/MsGraphResourceDataSource";

export const cosmosDataSources = () => {

  if(!process.env.CosmosDB || process.env.CosmosDB.length === 0) throw new Error("CosmosDB connection string not found.");

  const client = new CosmosClient(process.env.CosmosDB);
  const tenantContainer = client.database("kiri").container("tenant");
  const configurationContainer = client.database("kiri").container("configuration");
  const deviceContainer = client.database("kiri").container("device");
  const msGraphResourceContainer = client.database("kiri").container("msGraphResource");
  const configurationTypeContainer = client.database("kiri").container("configurationType");
  const jobContainer = client.database("kiri").container("job");
  const deploymentContainer = client.database("kiri").container("deployment");

  return {
    tenant: new CosmosTenantDataSource(tenantContainer),
    configuration: new CosmosConfigurationDataSource(configurationContainer),
    device: new CosmosTenantDataSource(deviceContainer),
    msGraphResource: new CosmosMsGraphResourceDataSource(msGraphResourceContainer),
    configurationType: new CosmosTenantDataSource(configurationTypeContainer),
    job: new CosmosTenantDataSource(jobContainer),
    deployment: new CosmosTenantDataSource(deploymentContainer),
  };
};
