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
  targetTenants?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
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
  configurations: Array<Maybe<Configuration>>;
  createdAt?: Maybe<Scalars["Date"]>;
  executionDate?: Maybe<Scalars["Date"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  targetTenants: Array<Maybe<Tenant>>;
  updatedAt?: Maybe<Scalars["Date"]>;
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
  createConfigurationType?: Maybe<ConfigurationType>;
  createDeployment?: Maybe<Deployment>;
  createMsGraphResource?: Maybe<MsGraphResource>;
  createTenant?: Maybe<Tenant>;
  deleteConfigurationType?: Maybe<ConfigurationType>;
  deleteDeployment?: Maybe<Deployment>;
  deleteMsGraphResource?: Maybe<MsGraphResource>;
  deleteTenant?: Maybe<Tenant>;
  updateDeployment?: Maybe<Deployment>;
  updateTenant?: Maybe<Tenant>;
};

export type MutationCreateConfigurationTypeArgs = {
  record?: InputMaybe<CreateConfigurationTypeInput>;
};

export type MutationCreateDeploymentArgs = {
  record: CreateDeploymentInput;
};

export type MutationCreateMsGraphResourceArgs = {
  record?: InputMaybe<CreateMsGraphResourceInput>;
};

export type MutationCreateTenantArgs = {
  record?: InputMaybe<CreateTenantInput>;
};

export type MutationDeleteConfigurationTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteDeploymentArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteMsGraphResourceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTenantArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateDeploymentArgs = {
  id: Scalars["ID"];
  record: UpdateDeploymentInput;
};

export type MutationUpdateTenantArgs = {
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
  tenantByIds?: Maybe<Array<Maybe<Tenant>>>;
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

export type QueryTenantByIdsArgs = {
  id?: InputMaybe<Array<Scalars["ID"]>>;
};

export type Tenant = {
  __typename?: "Tenant";
  appId: Scalars["String"];
  createdAt?: Maybe<Scalars["Date"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  tenantId: Scalars["String"];
  updatedAt?: Maybe<Scalars["Date"]>;
  verified?: Maybe<Scalars["Boolean"]>;
};

export type UpdateDeploymentInput = {
  configurations?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  createdAt?: InputMaybe<Scalars["Date"]>;
  executionDate?: InputMaybe<Scalars["Date"]>;
  name?: InputMaybe<Scalars["String"]>;
  targetTenants?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
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

export type CreateMsGraphResourceMutationVariables = Exact<{
  record: CreateMsGraphResourceInput;
}>;

export type CreateMsGraphResourceMutation = {
  __typename?: "Mutation";
  createMsGraphResource?: { __typename?: "MsGraphResource"; id: string } | null;
};

export type CreateTenantMutationVariables = Exact<{
  record: CreateTenantInput;
}>;

export type CreateTenantMutation = {
  __typename?: "Mutation";
  createTenant?: { __typename?: "Tenant"; id: string; name: string } | null;
};

export type DeleteMsGraphResourceMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteMsGraphResourceMutation = {
  __typename?: "Mutation";
  deleteMsGraphResource?: { __typename?: "MsGraphResource"; id: string } | null;
};

export type DeleteTenantMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteTenantMutation = {
  __typename?: "Mutation";
  deleteTenant?: { __typename?: "Tenant"; id: string } | null;
};

export const CreateMsGraphResourceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateMsGraphResource" },
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
            name: { kind: "Name", value: "createMsGraphResource" },
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
  CreateMsGraphResourceMutation,
  CreateMsGraphResourceMutationVariables
>;
export const CreateTenantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateTenant" },
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
            name: { kind: "Name", value: "createTenant" },
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
  CreateTenantMutation,
  CreateTenantMutationVariables
>;
export const DeleteMsGraphResourceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteMsGraphResource" },
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
            name: { kind: "Name", value: "deleteMsGraphResource" },
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
  DeleteMsGraphResourceMutation,
  DeleteMsGraphResourceMutationVariables
>;
export const DeleteTenantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteTenant" },
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
            name: { kind: "Name", value: "deleteTenant" },
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
  DeleteTenantMutation,
  DeleteTenantMutationVariables
>;
