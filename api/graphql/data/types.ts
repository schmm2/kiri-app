export enum ModelType {
  Tenant = "Tenant",
  Configuration = "Configuration",
  MsGraphResource = "MsGraphResource",
}

type Model = {
  id: string;
  modelType: ModelType;
};

export type TenantModel = {
  tenantId: string;
  appId: string;
  name: string;
} & Model;

export type ConfigurationModel = {
  graphId: string;
  graphCreatedAt: string;
  tenant: TenantModel;
} & Model;

export type MsGraphResourceModel = {
  name: string;
  resource: string;
  version: string;
  category: string;
  nameAttribute: string;
  expandAttributes: string[];
} & Model;

export interface ITenantDataSource {
  getTenants(): Promise<TenantModel[]>;
  getTenant(id: string): Promise<TenantModel>;
  createTenant(name: string, tenantId: string, appId: string): Promise<TenantModel>;
  updateTenant(tenant: TenantModel): Promise<TenantModel>;
}

export interface IConfigurationDataSource {
  getConfigurations(): Promise<ConfigurationModel[]>;
  getConfiguration(id: string): Promise<ConfigurationModel>;
  //createConfiguration(graphId: string, graphCreatedAt: string): Promise<ConfigurationModel>;
  //updateConfiguration(tenant: ConfigurationModel): Promise<ConfigurationModel>;
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
    tenant: MsGraphResourceModel
  ): Promise<MsGraphResourceModel>;
}
