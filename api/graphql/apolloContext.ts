import {
  IConfigurationDataSource,
  IMsGraphResourceDataSource,
  IConfigurationVersionDataSource,
  IConfigurationTypeDataSource,
  ITenantDataSource,
  IDeviceWarrantyDataSource,
  IDeviceDataSource,
  IDeviceVersionDataSource,
  IJobDataSource,
  IDeploymentDataSource
} from "./data/types";

export type ApolloContext = {
  dataSources: {
    tenant: ITenantDataSource,
    configuration: IConfigurationDataSource,
    configurationVersion: IConfigurationVersionDataSource,
    configurationType: IConfigurationTypeDataSource,
    msgraphresource: IMsGraphResourceDataSource
    device: IDeviceDataSource,
    deviceWarranty: IDeviceWarrantyDataSource,
    deviceVersion: IDeviceVersionDataSource,
    job: IJobDataSource,
    deployment: IDeploymentDataSource
  };
};
