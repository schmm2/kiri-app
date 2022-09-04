import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Configuration = {
  __typename?: "Configuration";
  configurationType?: Maybe<ConfigurationType>;
  configurationVersions?: Maybe<Array<Maybe<ConfigurationVersion>>>;
  createdAt?: Maybe<Scalars["Date"]>;
  graphCreatedAt: Scalars["String"];
  graphId: Scalars["String"];
  id: Scalars["ID"];
  newestConfigurationVersion?: Maybe<ConfigurationVersion>;
  tenant: Tenant;
  updatedAt?: Maybe<Scalars["Date"]>;
};

export type ConfigurationConfigurationVersionsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  skip?: InputMaybe<Scalars["Int"]>;
};

export type ConfigurationType = {
  __typename?: "ConfigurationType";
  category: Scalars["String"];
  configurations: Array<Maybe<Configuration>>;
  createdAt?: Maybe<Scalars["Date"]>;
  id: Scalars["ID"];
  msGraphResource?: Maybe<MsGraphResource>;
  name: Scalars["String"];
  platform: Scalars["String"];
  updatedAt?: Maybe<Scalars["Date"]>;
};

export type ConfigurationTypeConfigurationsArgs = {
  ids: Array<Scalars["ID"]>;
};

export type ConfigurationVersion = {
  __typename?: "ConfigurationVersion";
  configuration?: Maybe<Configuration>;
  createdAt?: Maybe<Scalars["Date"]>;
  displayName: Scalars["String"];
  graphModifiedAt: Scalars["String"];
  graphVersion?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  state: EnumConfigurationVersionState;
  updatedAt?: Maybe<Scalars["Date"]>;
  value: Scalars["String"];
  version: Scalars["String"];
};

export type CreateConfigurationInput = {
  configurationType: Scalars["ID"];
  createdAt?: InputMaybe<Scalars["Date"]>;
  graphCreatedAt: Scalars["String"];
  graphId: Scalars["String"];
  newestConfigurationVersion?: InputMaybe<Scalars["ID"]>;
  tenant: Scalars["ID"];
  updatedAt?: InputMaybe<Scalars["Date"]>;
};

export type CreateConfigurationTypeInput = {
  category: Scalars["String"];
  createdAt?: InputMaybe<Scalars["Date"]>;
  msGraphResource?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
  platform: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["Date"]>;
};

export type CreateConfigurationVersionInput = {
  configuration?: InputMaybe<Scalars["ID"]>;
  createdAt?: InputMaybe<Scalars["Date"]>;
  displayName: Scalars["String"];
  graphModifiedAt: Scalars["String"];
  graphVersion?: InputMaybe<Scalars["String"]>;
  state: EnumConfigurationVersionState;
  updatedAt?: InputMaybe<Scalars["Date"]>;
  value: Scalars["String"];
  version: Scalars["String"];
};

export type CreateDeploymentInput = {
  configurations?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  createdAt?: InputMaybe<Scalars["Date"]>;
  executionDate?: InputMaybe<Scalars["Date"]>;
  name: Scalars["String"];
  tenants?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  updatedAt?: InputMaybe<Scalars["Date"]>;
};

export type CreateDeviceInput = {
  createdAt?: InputMaybe<Scalars["Date"]>;
  deviceId: Scalars["String"];
  deviceWarranty?: InputMaybe<Scalars["ID"]>;
  tenant: Scalars["ID"];
  updatedAt?: InputMaybe<Scalars["Date"]>;
};

export type CreateDeviceVersionInput = {
  createdAt?: InputMaybe<Scalars["Date"]>;
  device?: InputMaybe<Scalars["ID"]>;
  deviceName: Scalars["String"];
  manufacturer?: InputMaybe<Scalars["String"]>;
  operatingSystem?: InputMaybe<Scalars["String"]>;
  osVersion?: InputMaybe<Scalars["String"]>;
  osVersionName?: InputMaybe<Scalars["String"]>;
  state: EnumDeviceVersionState;
  successorVersion?: InputMaybe<Scalars["ID"]>;
  updatedAt?: InputMaybe<Scalars["Date"]>;
  upn?: InputMaybe<Scalars["String"]>;
  value: Scalars["String"];
  version: Scalars["String"];
};

export type CreateDeviceWarrantyInput = {
  createdAt?: InputMaybe<Scalars["Date"]>;
  device: Scalars["ID"];
  endDate: Scalars["Date"];
  productName?: InputMaybe<Scalars["String"]>;
  serialNumber: Scalars["String"];
  startDate: Scalars["Date"];
  updatedAt?: InputMaybe<Scalars["Date"]>;
};

export type CreateJobInput = {
  createdAt?: InputMaybe<Scalars["Date"]>;
  log?: InputMaybe<Array<InputMaybe<LogInput>>>;
  state: EnumJobState;
  tenant?: InputMaybe<Scalars["ID"]>;
  type: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["Date"]>;
};

export type CreateMsGraphResourceInput = {
  category?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["Date"]>;
  expandAttributes?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name: Scalars["String"];
  nameAttribute?: InputMaybe<Scalars["String"]>;
  resource: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["Date"]>;
  version: Scalars["String"];
};

export type CreateTenantInput = {
  appId: Scalars["String"];
  createdAt?: InputMaybe<Scalars["Date"]>;
  name: Scalars["String"];
  tenantId: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["Date"]>;
  verified?: InputMaybe<Scalars["Boolean"]>;
};

export type Deployment = {
  __typename?: "Deployment";
  configurations: Array<Configuration>;
  createdAt?: Maybe<Scalars["Date"]>;
  executionDate?: Maybe<Scalars["Date"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  tenants: Array<Tenant>;
  updatedAt?: Maybe<Scalars["Date"]>;
};

export type DeploymentConfigurationsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
};

export type DeploymentTenantsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
};

export type Device = {
  __typename?: "Device";
  createdAt?: Maybe<Scalars["Date"]>;
  deviceId: Scalars["String"];
  deviceWarranty?: Maybe<DeviceWarranty>;
  id: Scalars["ID"];
  newestDeviceVersions: Array<DeviceVersion>;
  tenant?: Maybe<Tenant>;
  updatedAt?: Maybe<Scalars["Date"]>;
};

export type DeviceNewestDeviceVersionsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  skip?: InputMaybe<Scalars["Int"]>;
};

export type DeviceVersion = {
  __typename?: "DeviceVersion";
  createdAt?: Maybe<Scalars["Date"]>;
  device?: Maybe<Device>;
  deviceName: Scalars["String"];
  id: Scalars["ID"];
  manufacturer?: Maybe<Scalars["String"]>;
  operatingSystem?: Maybe<Scalars["String"]>;
  osVersion?: Maybe<Scalars["String"]>;
  osVersionName?: Maybe<Scalars["String"]>;
  state: EnumDeviceVersionState;
  successorVersion?: Maybe<Scalars["ID"]>;
  updatedAt?: Maybe<Scalars["Date"]>;
  upn?: Maybe<Scalars["String"]>;
  value: Scalars["String"];
  version: Scalars["String"];
};

export type DeviceWarranty = {
  __typename?: "DeviceWarranty";
  createdAt?: Maybe<Scalars["Date"]>;
  device: Scalars["ID"];
  endDate: Scalars["Date"];
  id: Scalars["ID"];
  productName?: Maybe<Scalars["String"]>;
  serialNumber: Scalars["String"];
  startDate: Scalars["Date"];
  updatedAt?: Maybe<Scalars["Date"]>;
};

export enum EnumConfigurationVersionState {
  Deleted = "deleted",
  Modified = "modified",
  New = "new",
}

export enum EnumDeviceVersionState {
  Deleted = "deleted",
  Modified = "modified",
  New = "new",
}

export enum EnumJobState {
  Error = "ERROR",
  Finished = "FINISHED",
  Running = "RUNNING",
  Started = "STARTED",
  Warning = "WARNING",
}

export enum EnumLogState {
  Default = "DEFAULT",
  Error = "ERROR",
  Success = "SUCCESS",
  Warning = "WARNING",
}

export type Job = {
  __typename?: "Job";
  createdAt?: Maybe<Scalars["Date"]>;
  id: Scalars["ID"];
  log?: Maybe<Array<Maybe<Log>>>;
  state: EnumJobState;
  tenant?: Maybe<Tenant>;
  type: Scalars["String"];
  updatedAt?: Maybe<Scalars["Date"]>;
};

export type Log = {
  __typename?: "Log";
  action?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  message?: Maybe<Scalars["String"]>;
  state?: Maybe<EnumLogState>;
};

export type LogInput = {
  action?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  message?: InputMaybe<Scalars["String"]>;
  state?: InputMaybe<EnumLogState>;
};

export type MsGraphResource = {
  __typename?: "MsGraphResource";
  category?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["Date"]>;
  expandAttributes?: Maybe<Array<Maybe<Scalars["String"]>>>;
  id: Scalars["ID"];
  name: Scalars["String"];
  nameAttribute?: Maybe<Scalars["String"]>;
  resource: Scalars["String"];
  updatedAt?: Maybe<Scalars["Date"]>;
  version: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  configurationCreate?: Maybe<Configuration>;
  configurationDelete?: Maybe<Configuration>;
  configurationTypeCreate?: Maybe<ConfigurationType>;
  configurationTypeDelete?: Maybe<ConfigurationType>;
  configurationVersionCreate?: Maybe<ConfigurationVersion>;
  configurationVersionDelete?: Maybe<ConfigurationVersion>;
  deploymentCreate?: Maybe<Deployment>;
  deploymentDelete?: Maybe<Deployment>;
  deploymentUpdate?: Maybe<Deployment>;
  deviceCreate?: Maybe<Device>;
  deviceDelete?: Maybe<Device>;
  deviceVersionCreate?: Maybe<DeviceVersion>;
  deviceVersionDelete?: Maybe<DeviceVersion>;
  deviceWarrantyCreate?: Maybe<DeviceWarranty>;
  deviceWarrantyDelete?: Maybe<DeviceWarranty>;
  jobCreate?: Maybe<Job>;
  jobDelete?: Maybe<Job>;
  msGraphResourceCreate?: Maybe<MsGraphResource>;
  msGraphResourceDelete?: Maybe<MsGraphResource>;
  tenantCreate?: Maybe<Tenant>;
  tenantDelete?: Maybe<Tenant>;
  tenantUpdate?: Maybe<Tenant>;
};

export type MutationConfigurationCreateArgs = {
  record: CreateConfigurationInput;
};

export type MutationConfigurationDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationConfigurationTypeCreateArgs = {
  record?: InputMaybe<CreateConfigurationTypeInput>;
};

export type MutationConfigurationTypeDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationConfigurationVersionCreateArgs = {
  record?: InputMaybe<CreateConfigurationVersionInput>;
};

export type MutationConfigurationVersionDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationDeploymentCreateArgs = {
  record: CreateDeploymentInput;
};

export type MutationDeploymentDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationDeploymentUpdateArgs = {
  id: Scalars["ID"];
  record: UpdateDeploymentInput;
};

export type MutationDeviceCreateArgs = {
  record?: InputMaybe<CreateDeviceInput>;
};

export type MutationDeviceDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationDeviceVersionCreateArgs = {
  record: CreateDeviceVersionInput;
};

export type MutationDeviceVersionDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationDeviceWarrantyCreateArgs = {
  record: CreateDeviceWarrantyInput;
};

export type MutationDeviceWarrantyDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationJobCreateArgs = {
  record: CreateJobInput;
};

export type MutationJobDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationMsGraphResourceCreateArgs = {
  record?: InputMaybe<CreateMsGraphResourceInput>;
};

export type MutationMsGraphResourceDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationTenantCreateArgs = {
  record?: InputMaybe<CreateTenantInput>;
};

export type MutationTenantDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationTenantUpdateArgs = {
  id: Scalars["ID"];
  record: UpdateTenantInput;
};

export type Query = {
  __typename?: "Query";
  configurationById?: Maybe<Configuration>;
  configurationByIds: Array<Configuration>;
  configurationMany: Array<Configuration>;
  configurationTypeById?: Maybe<ConfigurationType>;
  configurationTypeByIds: Array<ConfigurationType>;
  configurationTypeMany: Array<ConfigurationType>;
  configurationVersionById?: Maybe<ConfigurationVersion>;
  configurationVersionByIds: Array<ConfigurationVersion>;
  configurationVersionMany: Array<ConfigurationVersion>;
  deploymentById?: Maybe<Deployment>;
  deploymentMany: Array<Deployment>;
  deviceById?: Maybe<Device>;
  deviceMany: Array<Device>;
  deviceVersionById?: Maybe<DeviceVersion>;
  deviceVersionMany: Array<DeviceVersion>;
  deviceWarrantyById?: Maybe<DeviceWarranty>;
  deviceWarrantyMany: Array<DeviceWarranty>;
  jobById?: Maybe<Job>;
  jobByIds: Array<Job>;
  jobMany: Array<Job>;
  msGraphResourceById?: Maybe<MsGraphResource>;
  msGraphResourceByIds: Array<MsGraphResource>;
  msGraphResourceMany: Array<MsGraphResource>;
  tenantById?: Maybe<Tenant>;
  tenantMany: Array<Tenant>;
};

export type QueryConfigurationByIdArgs = {
  id: Scalars["ID"];
};

export type QueryConfigurationByIdsArgs = {
  ids: Array<Scalars["ID"]>;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type QueryConfigurationTypeByIdArgs = {
  id: Scalars["ID"];
};

export type QueryConfigurationTypeByIdsArgs = {
  ids: Array<Scalars["ID"]>;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type QueryConfigurationVersionByIdArgs = {
  id: Scalars["ID"];
};

export type QueryConfigurationVersionByIdsArgs = {
  ids: Array<Scalars["ID"]>;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type QueryDeploymentByIdArgs = {
  id: Scalars["ID"];
};

export type QueryDeviceByIdArgs = {
  id: Scalars["ID"];
};

export type QueryDeviceVersionByIdArgs = {
  id: Scalars["ID"];
};

export type QueryDeviceWarrantyByIdArgs = {
  id: Scalars["ID"];
};

export type QueryJobByIdArgs = {
  id: Scalars["ID"];
};

export type QueryJobByIdsArgs = {
  ids: Array<Scalars["ID"]>;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type QueryMsGraphResourceByIdArgs = {
  id: Scalars["ID"];
};

export type QueryMsGraphResourceByIdsArgs = {
  ids: Array<Scalars["ID"]>;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type QueryTenantByIdArgs = {
  id: Scalars["ID"];
};

export type Tenant = {
  __typename?: "Tenant";
  appId: Scalars["String"];
  configurations: Array<Configuration>;
  createdAt?: Maybe<Scalars["Date"]>;
  id: Scalars["ID"];
  jobs: Array<Job>;
  name: Scalars["String"];
  tenantId: Scalars["String"];
  updatedAt?: Maybe<Scalars["Date"]>;
  verified?: Maybe<Scalars["Boolean"]>;
};

export type TenantConfigurationsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  skip?: InputMaybe<Scalars["Int"]>;
};

export type TenantJobsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  skip?: InputMaybe<Scalars["Int"]>;
};

export type UpdateDeploymentInput = {
  configurations?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  createdAt?: InputMaybe<Scalars["Date"]>;
  executionDate?: InputMaybe<Scalars["Date"]>;
  name?: InputMaybe<Scalars["String"]>;
  tenants?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  updatedAt?: InputMaybe<Scalars["Date"]>;
};

export type UpdateTenantInput = {
  appId?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["Date"]>;
  name?: InputMaybe<Scalars["String"]>;
  tenantId?: InputMaybe<Scalars["String"]>;
  updatedAt?: InputMaybe<Scalars["Date"]>;
  verified?: InputMaybe<Scalars["Boolean"]>;
};

export type ConfigurationCreateMutationVariables = Exact<{
  record: CreateConfigurationInput;
}>;

export type ConfigurationCreateMutation = {
  __typename?: "Mutation";
  configurationCreate?: { __typename?: "Configuration"; id: string } | null;
};

export type MsGraphResourceCreateMutationVariables = Exact<{
  record: CreateMsGraphResourceInput;
}>;

export type MsGraphResourceCreateMutation = {
  __typename?: "Mutation";
  msGraphResourceCreate?: { __typename?: "MsGraphResource"; id: string } | null;
};

export type MsGraphResourceDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type MsGraphResourceDeleteMutation = {
  __typename?: "Mutation";
  msGraphResourceDelete?: { __typename?: "MsGraphResource"; id: string } | null;
};

export type TenantCreateMutationVariables = Exact<{
  record: CreateTenantInput;
}>;

export type TenantCreateMutation = {
  __typename?: "Mutation";
  tenantCreate?: { __typename?: "Tenant"; id: string; name: string } | null;
};

export type TenantDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type TenantDeleteMutation = {
  __typename?: "Mutation";
  tenantDelete?: { __typename?: "Tenant"; id: string } | null;
};

export const ConfigurationCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ConfigurationCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "record" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateConfigurationInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "configurationCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "record" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "record" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConfigurationCreateMutation,
  ConfigurationCreateMutationVariables
>;
export const MsGraphResourceCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "MsGraphResourceCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "record" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateMsGraphResourceInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "msGraphResourceCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "record" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "record" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MsGraphResourceCreateMutation,
  MsGraphResourceCreateMutationVariables
>;
export const MsGraphResourceDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "msGraphResourceDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "msGraphResourceDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MsGraphResourceDeleteMutation,
  MsGraphResourceDeleteMutationVariables
>;
export const TenantCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TenantCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "record" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateTenantInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tenantCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "record" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "record" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TenantCreateMutation,
  TenantCreateMutationVariables
>;
export const TenantDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TenantDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tenantDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TenantDeleteMutation,
  TenantDeleteMutationVariables
>;
