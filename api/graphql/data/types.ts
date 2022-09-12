export enum ModelType {
  Tenant = "Tenant",
  Configuration = "Configuration",
  ConfigurationVersion = "ConfigurationVersion",
  ConfigurationType = "ConfigurationType",
  MsGraphResource = "MsGraphResource",
  Device = "Device",
  DeviceWarranty = "DeviceWarranty",
  DeviceVersion = "DeviceVersion",
  Job = "Job",
  Deployment = "Deployment"
}

type BaseModel = {
  id: string;
  modelType: ModelType;
};

export type TenantModel = {
  tenantId: string;
  appId: string; 
  name: string;
} & BaseModel;

export type JobModel = {
  type: string;
  state: string;
  log: string; 
  tenant: TenantModel;
} & BaseModel;

export type DeploymentModel = {
  displayName: string;
  configurations: ConfigurationModel[];
  executionDate: string; 
  result: string;
  tenant: TenantModel;
} & BaseModel;

export type DeviceWarrantyModel = {
  serialNumber: string;
  productName: string;
  startDate: string;
  endDate: string;
  device: DeviceModel;
} & BaseModel;

export type DeviceModel = {
  deviceId: string;
  tenant: TenantModel;
} & BaseModel;

export type DeviceVersionModel = {
  deviceName: string,
  manufacturerur: string,
  operatingSystem: string,
  upn: string;
  osVersion: string;
  osVersionName: string;
  value: string;
  version: string;
  device: DeviceModel;
} & BaseModel;

export type ConfigurationModel = {
  graphId: string;
  graphCreatedAt: string;
  tenant: TenantModel;
} & BaseModel;

export type ConfigurationVersionModel = {
  displayName: string;
  graphModifiedAt: string;
  graphVersion: string;
  value: string;
  version: string;
  configuration: ConfigurationModel;
} & BaseModel;

export type ConfigurationTypeModel = {
  name: string;
  platform: string;
  category: string;
  msGraphResource: MsGraphResourceModel;
} & BaseModel;

export type MsGraphResourceModel = {
  name: string;
  resource: string;
  version: string;
  category: string;
  nameAttribute: string;
  expandAttributes: string[];
} & BaseModel;

export interface ITenantDataSource {
  getTenants(): Promise<TenantModel[]>;
  getTenant(id: string): Promise<TenantModel>;
  createTenant(name: string, tenantId: string, appId: string): Promise<TenantModel>;
  updateTenant(tenant: TenantModel): Promise<TenantModel>;
}

export interface IDeviceDataSource {
  getDevices(): Promise<DeviceModel[]>;
  getDevice(id: string): Promise<DeviceModel>;
  //createConfiguration(graphId: string, graphCreatedAt: string): Promise<ConfigurationModel>;
  //updateConfiguration(tenant: ConfigurationModel): Promise<ConfigurationModel>;
}

export interface IDeviceWarrantyDataSource {
  getDeviceWarranties(): Promise<DeviceWarrantyModel[]>;
  getDeviceWarranty(id: string): Promise<DeviceWarrantyModel>;
  //createConfiguration(graphId: string, graphCreatedAt: string): Promise<ConfigurationModel>;
  //updateConfiguration(tenant: ConfigurationModel): Promise<ConfigurationModel>;
}


export interface IConfigurationDataSource {
  getConfigurations(): Promise<ConfigurationModel[]>;
  getConfiguration(id: string): Promise<ConfigurationModel>;
  //createConfiguration(graphId: string, graphCreatedAt: string): Promise<ConfigurationModel>;
  //updateConfiguration(tenant: ConfigurationModel): Promise<ConfigurationModel>;
}

export interface IJobDataSource {
  getJobs(): Promise<JobModel[]>;
  getJob(id: string): Promise<JobModel>;
}

export interface IDeviceVersionDataSource {
  getDeviceVersions(): Promise<DeviceVersionModel[]>;
  getDeviceVersion(id: string): Promise<DeviceVersionModel>;
}

export interface IDeploymentDataSource {
  getDeployments(): Promise<DeploymentModel[]>;
  getDeployment(id: string): Promise<DeploymentModel>;
  createDeployment(
    displayName: string,
    configurations: ConfigurationModel[],
    executionDate: string,
    result: string,
    tenant: TenantModel,
  ): Promise<DeploymentModel>;
  updateDeployment(deployment: DeploymentModel): Promise<DeploymentModel>;
}

export interface IConfigurationVersionDataSource {
  getConfigurationVersions(): Promise<ConfigurationVersionModel[]>;
  getConfigurationVersion(id: string): Promise<ConfigurationVersionModel>;
  /*createConfigurationVersion(
    displayName: string,
    graphModifiedAt: string,
    graphVersion: string,
    value: string,
    configuration: ConfigurationModel,
  ): Promise<ConfigurationVersionModel>;
  updateConfiguration(configurationVersion: ConfigurationVersionModel): Promise<ConfigurationVersionModel>;*/
}

export interface IMsGraphResourceDataSource {
  getMsGraphResources(): Promise<MsGraphResourceModel[]>;
  getMsGraphResource(id: string): Promise<MsGraphResourceModel>;
  createMsGraphResource(
    name: string,
    resource: string,
    version: string,
    category: string,
    nameAttribute: string,
    expandAttributes: string[]
  ): Promise<MsGraphResourceModel>;
  updateMsGraphResource(
    msGraphResource: MsGraphResourceModel
  ): Promise<MsGraphResourceModel>;
}

export interface IConfigurationTypeDataSource {
  getConfigurationTypes(): Promise<ConfigurationTypeModel[]>;
  getConfigurationType(id: string): Promise<ConfigurationTypeModel>;
  createConfigurationType(
    name: string,
    platform: string,
    category: string,
    msGraphResource: MsGraphResourceModel
  ): Promise<ConfigurationTypeModel>;
  updateConfigurationType(
    configurationType: ConfigurationTypeModel
  ): Promise<ConfigurationTypeModel>;
}
