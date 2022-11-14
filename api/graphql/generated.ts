import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import {
  TenantModel,
  DeploymentModel,
  ConfigurationModel,
  ConfigurationVersionModel,
  ConfigurationTypeModel,
  MsGraphResourceModel,
  JobModel,
} from "./data/types";
import { ApolloContext } from "./apolloContext";
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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
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
  createdAt?: Maybe<Scalars["Date"]>;
  graphCreatedAt: Scalars["String"];
  graphId: Scalars["String"];
  id: Scalars["ID"];
  tenant: Tenant;
  updatedAt?: Maybe<Scalars["Date"]>;
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
  transformRulesCreate?: InputMaybe<Array<InputMaybe<TransformRuleInput>>>;
  transformRulesPatch?: InputMaybe<Array<InputMaybe<TransformRuleInput>>>;
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
  newestDeviceVersion?: Maybe<DeviceVersion>;
  tenant?: Maybe<Tenant>;
  updatedAt?: Maybe<Scalars["Date"]>;
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
  configurationTypes?: Maybe<Array<Maybe<ConfigurationType>>>;
  createdAt?: Maybe<Scalars["Date"]>;
  expandAttributes?: Maybe<Array<Maybe<Scalars["String"]>>>;
  id: Scalars["ID"];
  name: Scalars["String"];
  nameAttribute?: Maybe<Scalars["String"]>;
  resource: Scalars["String"];
  transformRulesCreate?: Maybe<Array<Maybe<TransformRule>>>;
  transformRulesPatch?: Maybe<Array<Maybe<TransformRule>>>;
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

export type TransformRule = {
  __typename?: "TransformRule";
  action?: Maybe<Scalars["String"]>;
  property?: Maybe<Scalars["String"]>;
};

export type TransformRuleInput = {
  action?: InputMaybe<Scalars["String"]>;
  property?: InputMaybe<Scalars["String"]>;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Configuration: ResolverTypeWrapper<ConfigurationModel>;
  ConfigurationType: ResolverTypeWrapper<ConfigurationTypeModel>;
  ConfigurationVersion: ResolverTypeWrapper<ConfigurationVersionModel>;
  CreateConfigurationInput: CreateConfigurationInput;
  CreateConfigurationTypeInput: CreateConfigurationTypeInput;
  CreateConfigurationVersionInput: CreateConfigurationVersionInput;
  CreateDeploymentInput: CreateDeploymentInput;
  CreateDeviceInput: CreateDeviceInput;
  CreateDeviceVersionInput: CreateDeviceVersionInput;
  CreateDeviceWarrantyInput: CreateDeviceWarrantyInput;
  CreateJobInput: CreateJobInput;
  CreateMsGraphResourceInput: CreateMsGraphResourceInput;
  CreateTenantInput: CreateTenantInput;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Deployment: ResolverTypeWrapper<DeploymentModel>;
  Device: ResolverTypeWrapper<
    Omit<Device, "newestDeviceVersion" | "tenant"> & {
      newestDeviceVersion?: Maybe<ResolversTypes["DeviceVersion"]>;
      tenant?: Maybe<ResolversTypes["Tenant"]>;
    }
  >;
  DeviceVersion: ResolverTypeWrapper<
    Omit<DeviceVersion, "device"> & { device?: Maybe<ResolversTypes["Device"]> }
  >;
  DeviceWarranty: ResolverTypeWrapper<DeviceWarranty>;
  EnumJobState: EnumJobState;
  EnumLogState: EnumLogState;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Job: ResolverTypeWrapper<JobModel>;
  Log: ResolverTypeWrapper<Log>;
  LogInput: LogInput;
  MsGraphResource: ResolverTypeWrapper<MsGraphResourceModel>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Tenant: ResolverTypeWrapper<TenantModel>;
  TransformRule: ResolverTypeWrapper<TransformRule>;
  TransformRuleInput: TransformRuleInput;
  UpdateDeploymentInput: UpdateDeploymentInput;
  UpdateTenantInput: UpdateTenantInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  Configuration: ConfigurationModel;
  ConfigurationType: ConfigurationTypeModel;
  ConfigurationVersion: ConfigurationVersionModel;
  CreateConfigurationInput: CreateConfigurationInput;
  CreateConfigurationTypeInput: CreateConfigurationTypeInput;
  CreateConfigurationVersionInput: CreateConfigurationVersionInput;
  CreateDeploymentInput: CreateDeploymentInput;
  CreateDeviceInput: CreateDeviceInput;
  CreateDeviceVersionInput: CreateDeviceVersionInput;
  CreateDeviceWarrantyInput: CreateDeviceWarrantyInput;
  CreateJobInput: CreateJobInput;
  CreateMsGraphResourceInput: CreateMsGraphResourceInput;
  CreateTenantInput: CreateTenantInput;
  Date: Scalars["Date"];
  Deployment: DeploymentModel;
  Device: Omit<Device, "newestDeviceVersion" | "tenant"> & {
    newestDeviceVersion?: Maybe<ResolversParentTypes["DeviceVersion"]>;
    tenant?: Maybe<ResolversParentTypes["Tenant"]>;
  };
  DeviceVersion: Omit<DeviceVersion, "device"> & {
    device?: Maybe<ResolversParentTypes["Device"]>;
  };
  DeviceWarranty: DeviceWarranty;
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Job: JobModel;
  Log: Log;
  LogInput: LogInput;
  MsGraphResource: MsGraphResourceModel;
  Mutation: {};
  Query: {};
  String: Scalars["String"];
  Tenant: TenantModel;
  TransformRule: TransformRule;
  TransformRuleInput: TransformRuleInput;
  UpdateDeploymentInput: UpdateDeploymentInput;
  UpdateTenantInput: UpdateTenantInput;
};

export type ConfigurationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Configuration"] = ResolversParentTypes["Configuration"]
> = {
  configurationType?: Resolver<
    Maybe<ResolversTypes["ConfigurationType"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  graphCreatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  graphId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  tenant?: Resolver<ResolversTypes["Tenant"], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConfigurationTypeResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["ConfigurationType"] = ResolversParentTypes["ConfigurationType"]
> = {
  category?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  configurations?: Resolver<
    Array<Maybe<ResolversTypes["Configuration"]>>,
    ParentType,
    ContextType,
    RequireFields<ConfigurationTypeConfigurationsArgs, "ids">
  >;
  createdAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  msGraphResource?: Resolver<
    Maybe<ResolversTypes["MsGraphResource"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  platform?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConfigurationVersionResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["ConfigurationVersion"] = ResolversParentTypes["ConfigurationVersion"]
> = {
  configuration?: Resolver<
    Maybe<ResolversTypes["Configuration"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  graphModifiedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  graphVersion?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  version?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type DeploymentResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Deployment"] = ResolversParentTypes["Deployment"]
> = {
  configurations?: Resolver<
    Array<Maybe<ResolversTypes["Configuration"]>>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  executionDate?: Resolver<
    Maybe<ResolversTypes["Date"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  targetTenants?: Resolver<
    Array<Maybe<ResolversTypes["Tenant"]>>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeviceResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Device"] = ResolversParentTypes["Device"]
> = {
  createdAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  deviceId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  deviceWarranty?: Resolver<
    Maybe<ResolversTypes["DeviceWarranty"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  newestDeviceVersion?: Resolver<
    Maybe<ResolversTypes["DeviceVersion"]>,
    ParentType,
    ContextType
  >;
  tenant?: Resolver<Maybe<ResolversTypes["Tenant"]>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeviceVersionResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["DeviceVersion"] = ResolversParentTypes["DeviceVersion"]
> = {
  createdAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  device?: Resolver<Maybe<ResolversTypes["Device"]>, ParentType, ContextType>;
  deviceName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  manufacturer?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  operatingSystem?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  osVersion?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  osVersionName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  successorVersion?: Resolver<
    Maybe<ResolversTypes["ID"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  upn?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  version?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeviceWarrantyResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["DeviceWarranty"] = ResolversParentTypes["DeviceWarranty"]
> = {
  createdAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  device?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  productName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  serialNumber?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Job"] = ResolversParentTypes["Job"]
> = {
  createdAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  log?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Log"]>>>,
    ParentType,
    ContextType
  >;
  state?: Resolver<ResolversTypes["EnumJobState"], ParentType, ContextType>;
  tenant?: Resolver<Maybe<ResolversTypes["Tenant"]>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Log"] = ResolversParentTypes["Log"]
> = {
  action?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  state?: Resolver<
    Maybe<ResolversTypes["EnumLogState"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MsGraphResourceResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["MsGraphResource"] = ResolversParentTypes["MsGraphResource"]
> = {
  category?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  configurationTypes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ConfigurationType"]>>>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  expandAttributes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nameAttribute?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  resource?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  transformRulesCreate?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TransformRule"]>>>,
    ParentType,
    ContextType
  >;
  transformRulesPatch?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TransformRule"]>>>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createConfigurationType?: Resolver<
    Maybe<ResolversTypes["ConfigurationType"]>,
    ParentType,
    ContextType,
    Partial<MutationCreateConfigurationTypeArgs>
  >;
  createDeployment?: Resolver<
    Maybe<ResolversTypes["Deployment"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateDeploymentArgs, "record">
  >;
  createMsGraphResource?: Resolver<
    Maybe<ResolversTypes["MsGraphResource"]>,
    ParentType,
    ContextType,
    Partial<MutationCreateMsGraphResourceArgs>
  >;
  createTenant?: Resolver<
    Maybe<ResolversTypes["Tenant"]>,
    ParentType,
    ContextType,
    Partial<MutationCreateTenantArgs>
  >;
  deleteConfigurationType?: Resolver<
    Maybe<ResolversTypes["ConfigurationType"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteConfigurationTypeArgs, "id">
  >;
  deleteDeployment?: Resolver<
    Maybe<ResolversTypes["Deployment"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteDeploymentArgs, "id">
  >;
  deleteMsGraphResource?: Resolver<
    Maybe<ResolversTypes["MsGraphResource"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteMsGraphResourceArgs, "id">
  >;
  deleteTenant?: Resolver<
    Maybe<ResolversTypes["Tenant"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTenantArgs, "id">
  >;
  updateDeployment?: Resolver<
    Maybe<ResolversTypes["Deployment"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDeploymentArgs, "id" | "record">
  >;
  updateTenant?: Resolver<
    Maybe<ResolversTypes["Tenant"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTenantArgs, "id" | "record">
  >;
};

export type QueryResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  configurationById?: Resolver<
    Maybe<ResolversTypes["Configuration"]>,
    ParentType,
    ContextType,
    RequireFields<QueryConfigurationByIdArgs, "id">
  >;
  configurationByIds?: Resolver<
    Array<ResolversTypes["Configuration"]>,
    ParentType,
    ContextType,
    RequireFields<QueryConfigurationByIdsArgs, "ids" | "limit">
  >;
  configurationMany?: Resolver<
    Array<ResolversTypes["Configuration"]>,
    ParentType,
    ContextType
  >;
  configurationTypeById?: Resolver<
    Maybe<ResolversTypes["ConfigurationType"]>,
    ParentType,
    ContextType,
    RequireFields<QueryConfigurationTypeByIdArgs, "id">
  >;
  configurationTypeByIds?: Resolver<
    Array<ResolversTypes["ConfigurationType"]>,
    ParentType,
    ContextType,
    RequireFields<QueryConfigurationTypeByIdsArgs, "ids" | "limit">
  >;
  configurationTypeMany?: Resolver<
    Array<ResolversTypes["ConfigurationType"]>,
    ParentType,
    ContextType
  >;
  configurationVersionById?: Resolver<
    Maybe<ResolversTypes["ConfigurationVersion"]>,
    ParentType,
    ContextType,
    RequireFields<QueryConfigurationVersionByIdArgs, "id">
  >;
  configurationVersionByIds?: Resolver<
    Array<ResolversTypes["ConfigurationVersion"]>,
    ParentType,
    ContextType,
    RequireFields<QueryConfigurationVersionByIdsArgs, "ids" | "limit">
  >;
  configurationVersionMany?: Resolver<
    Array<ResolversTypes["ConfigurationVersion"]>,
    ParentType,
    ContextType
  >;
  deploymentById?: Resolver<
    Maybe<ResolversTypes["Deployment"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDeploymentByIdArgs, "id">
  >;
  deploymentMany?: Resolver<
    Array<ResolversTypes["Deployment"]>,
    ParentType,
    ContextType
  >;
  deviceById?: Resolver<
    Maybe<ResolversTypes["Device"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDeviceByIdArgs, "id">
  >;
  deviceMany?: Resolver<
    Array<ResolversTypes["Device"]>,
    ParentType,
    ContextType
  >;
  deviceVersionById?: Resolver<
    Maybe<ResolversTypes["DeviceVersion"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDeviceVersionByIdArgs, "id">
  >;
  deviceVersionMany?: Resolver<
    Array<ResolversTypes["DeviceVersion"]>,
    ParentType,
    ContextType
  >;
  deviceWarrantyById?: Resolver<
    Maybe<ResolversTypes["DeviceWarranty"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDeviceWarrantyByIdArgs, "id">
  >;
  deviceWarrantyMany?: Resolver<
    Array<ResolversTypes["DeviceWarranty"]>,
    ParentType,
    ContextType
  >;
  jobById?: Resolver<
    Maybe<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    RequireFields<QueryJobByIdArgs, "id">
  >;
  jobByIds?: Resolver<
    Array<ResolversTypes["Job"]>,
    ParentType,
    ContextType,
    RequireFields<QueryJobByIdsArgs, "ids" | "limit">
  >;
  jobMany?: Resolver<Array<ResolversTypes["Job"]>, ParentType, ContextType>;
  msGraphResourceById?: Resolver<
    Maybe<ResolversTypes["MsGraphResource"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMsGraphResourceByIdArgs, "id">
  >;
  msGraphResourceByIds?: Resolver<
    Array<ResolversTypes["MsGraphResource"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMsGraphResourceByIdsArgs, "ids" | "limit">
  >;
  msGraphResourceMany?: Resolver<
    Array<ResolversTypes["MsGraphResource"]>,
    ParentType,
    ContextType
  >;
  tenantById?: Resolver<
    Maybe<ResolversTypes["Tenant"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTenantByIdArgs, "id">
  >;
  tenantByIds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Tenant"]>>>,
    ParentType,
    ContextType,
    Partial<QueryTenantByIdsArgs>
  >;
  tenantMany?: Resolver<
    Array<ResolversTypes["Tenant"]>,
    ParentType,
    ContextType
  >;
};

export type TenantResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Tenant"] = ResolversParentTypes["Tenant"]
> = {
  appId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tenantId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  verified?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransformRuleResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["TransformRule"] = ResolversParentTypes["TransformRule"]
> = {
  action?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  property?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContext> = {
  Configuration?: ConfigurationResolvers<ContextType>;
  ConfigurationType?: ConfigurationTypeResolvers<ContextType>;
  ConfigurationVersion?: ConfigurationVersionResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Deployment?: DeploymentResolvers<ContextType>;
  Device?: DeviceResolvers<ContextType>;
  DeviceVersion?: DeviceVersionResolvers<ContextType>;
  DeviceWarranty?: DeviceWarrantyResolvers<ContextType>;
  Job?: JobResolvers<ContextType>;
  Log?: LogResolvers<ContextType>;
  MsGraphResource?: MsGraphResourceResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tenant?: TenantResolvers<ContextType>;
  TransformRule?: TransformRuleResolvers<ContextType>;
};
