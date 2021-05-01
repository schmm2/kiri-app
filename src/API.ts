/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateDeviceInput = {
  id?: string | null,
  deviceId?: string | null,
  name: string,
  value: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  deviceTenantId: string,
};

export type ModelDeviceConditionInput = {
  deviceId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  value?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelDeviceConditionInput | null > | null,
  or?: Array< ModelDeviceConditionInput | null > | null,
  not?: ModelDeviceConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Device = {
  __typename: "Device",
  id?: string,
  deviceId?: string | null,
  name?: string,
  value?: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  tenant?: Tenant,
  owner?: string | null,
};

export type Tenant = {
  __typename: "Tenant",
  id?: string,
  tenantId?: string,
  name?: string,
  verified?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  owner?: string | null,
  jobs?: ModelJobConnection,
  devices?: ModelDeviceConnection,
  configurations?: ModelConfigurationConnection,
};

export type ModelJobConnection = {
  __typename: "ModelJobConnection",
  items?:  Array<Job | null > | null,
  nextToken?: string | null,
};

export type Job = {
  __typename: "Job",
  id?: string,
  state?: string,
  jobType?: string,
  message?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  timeToLive?: number,
  owner?: string,
  tenant?: Tenant,
};

export type ModelDeviceConnection = {
  __typename: "ModelDeviceConnection",
  items?:  Array<Device | null > | null,
  nextToken?: string | null,
};

export type ModelConfigurationConnection = {
  __typename: "ModelConfigurationConnection",
  items?:  Array<Configuration | null > | null,
  nextToken?: string | null,
};

export type Configuration = {
  __typename: "Configuration",
  id?: string,
  graphId?: string,
  configurationType?: ConfigurationType,
  graphCreatedAt?: string,
  graphIsDeleted?: boolean,
  createdAt?: string,
  updatedAt?: string,
  tenant?: Tenant,
  owner?: string | null,
  configurationVersions?: ModelConfigurationVersionConnection,
};

export type ConfigurationType = {
  __typename: "ConfigurationType",
  id?: string,
  odataType?: string,
  platform?: string,
  category?: string,
  label?: string,
  msGraphResource?: MSGraphResource,
  createdAt?: string,
  updatedAt?: string,
  configurations?: ModelConfigurationConnection,
};

export type MSGraphResource = {
  __typename: "MSGraphResource",
  id?: string,
  name?: string,
  resource?: string,
  version?: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  configurationTypes?: ModelConfigurationTypeConnection,
};

export type ModelConfigurationTypeConnection = {
  __typename: "ModelConfigurationTypeConnection",
  items?:  Array<ConfigurationType | null > | null,
  nextToken?: string | null,
};

export type ModelConfigurationVersionConnection = {
  __typename: "ModelConfigurationVersionConnection",
  items?:  Array<ConfigurationVersion | null > | null,
  nextToken?: string | null,
};

export type ConfigurationVersion = {
  __typename: "ConfigurationVersion",
  id?: string,
  displayName?: string,
  graphModifiedAt?: string,
  value?: string,
  version?: string,
  isNewest?: boolean,
  createdAt?: string,
  updatedAt?: string,
  configuration?: Configuration,
  owner?: string | null,
};

export type UpdateDeviceInput = {
  id: string,
  deviceId?: string | null,
  name?: string | null,
  value?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  deviceTenantId?: string | null,
};

export type DeleteDeviceInput = {
  id?: string | null,
};

export type CreateMSGraphResourceInput = {
  id?: string | null,
  name: string,
  resource: string,
  version: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelMSGraphResourceConditionInput = {
  name?: ModelStringInput | null,
  resource?: ModelStringInput | null,
  version?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMSGraphResourceConditionInput | null > | null,
  or?: Array< ModelMSGraphResourceConditionInput | null > | null,
  not?: ModelMSGraphResourceConditionInput | null,
};

export type UpdateMSGraphResourceInput = {
  id: string,
  name?: string | null,
  resource?: string | null,
  version?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteMSGraphResourceInput = {
  id?: string | null,
};

export type CreateConfigurationTypeInput = {
  id?: string | null,
  odataType: string,
  platform: string,
  category: string,
  label: string,
  configurationTypeMsGraphResourceId: string,
};

export type ModelConfigurationTypeConditionInput = {
  odataType?: ModelStringInput | null,
  platform?: ModelStringInput | null,
  category?: ModelStringInput | null,
  label?: ModelStringInput | null,
  and?: Array< ModelConfigurationTypeConditionInput | null > | null,
  or?: Array< ModelConfigurationTypeConditionInput | null > | null,
  not?: ModelConfigurationTypeConditionInput | null,
};

export type UpdateConfigurationTypeInput = {
  id: string,
  odataType?: string | null,
  platform?: string | null,
  category?: string | null,
  label?: string | null,
  configurationTypeMsGraphResourceId?: string | null,
};

export type DeleteConfigurationTypeInput = {
  id?: string | null,
};

export type CreateConfigurationInput = {
  id?: string | null,
  graphId: string,
  graphCreatedAt: string,
  graphIsDeleted: boolean,
  configurationTenantId: string,
  configurationConfigurationTypeId: string,
};

export type ModelConfigurationConditionInput = {
  graphId?: ModelStringInput | null,
  graphCreatedAt?: ModelStringInput | null,
  graphIsDeleted?: ModelBooleanInput | null,
  and?: Array< ModelConfigurationConditionInput | null > | null,
  or?: Array< ModelConfigurationConditionInput | null > | null,
  not?: ModelConfigurationConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateConfigurationInput = {
  id: string,
  graphId?: string | null,
  graphCreatedAt?: string | null,
  graphIsDeleted?: boolean | null,
  configurationTenantId?: string | null,
  configurationConfigurationTypeId?: string | null,
};

export type DeleteConfigurationInput = {
  id?: string | null,
};

export type CreateConfigurationVersionInput = {
  id?: string | null,
  displayName: string,
  graphModifiedAt: string,
  value: string,
  version: string,
  isNewest: boolean,
  configurationVersionConfigurationId: string,
};

export type ModelConfigurationVersionConditionInput = {
  displayName?: ModelStringInput | null,
  graphModifiedAt?: ModelStringInput | null,
  value?: ModelStringInput | null,
  version?: ModelStringInput | null,
  isNewest?: ModelBooleanInput | null,
  and?: Array< ModelConfigurationVersionConditionInput | null > | null,
  or?: Array< ModelConfigurationVersionConditionInput | null > | null,
  not?: ModelConfigurationVersionConditionInput | null,
};

export type UpdateConfigurationVersionInput = {
  id: string,
  displayName?: string | null,
  graphModifiedAt?: string | null,
  value?: string | null,
  version?: string | null,
  isNewest?: boolean | null,
  configurationVersionConfigurationId?: string | null,
};

export type DeleteConfigurationVersionInput = {
  id?: string | null,
};

export type CreateTenantInput = {
  id?: string | null,
  tenantId: string,
  name: string,
  verified?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelTenantConditionInput = {
  tenantId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  verified?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTenantConditionInput | null > | null,
  or?: Array< ModelTenantConditionInput | null > | null,
  not?: ModelTenantConditionInput | null,
};

export type UpdateTenantInput = {
  id: string,
  tenantId?: string | null,
  name?: string | null,
  verified?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteTenantInput = {
  id?: string | null,
};

export type CreateJobInput = {
  id?: string | null,
  state: string,
  jobType: string,
  message?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  timeToLive: number,
  owner: string,
  jobTenantId: string,
};

export type ModelJobConditionInput = {
  state?: ModelStringInput | null,
  jobType?: ModelStringInput | null,
  message?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  timeToLive?: ModelIntInput | null,
  and?: Array< ModelJobConditionInput | null > | null,
  or?: Array< ModelJobConditionInput | null > | null,
  not?: ModelJobConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateJobInput = {
  id: string,
  state?: string | null,
  jobType?: string | null,
  message?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  timeToLive?: number | null,
  owner?: string | null,
  jobTenantId?: string | null,
};

export type DeleteJobInput = {
  id?: string | null,
};

export type ModelMSGraphResourceFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  resource?: ModelStringInput | null,
  version?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMSGraphResourceFilterInput | null > | null,
  or?: Array< ModelMSGraphResourceFilterInput | null > | null,
  not?: ModelMSGraphResourceFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelMSGraphResourceConnection = {
  __typename: "ModelMSGraphResourceConnection",
  items?:  Array<MSGraphResource | null > | null,
  nextToken?: string | null,
};

export type ModelConfigurationTypeFilterInput = {
  id?: ModelIDInput | null,
  odataType?: ModelStringInput | null,
  platform?: ModelStringInput | null,
  category?: ModelStringInput | null,
  label?: ModelStringInput | null,
  and?: Array< ModelConfigurationTypeFilterInput | null > | null,
  or?: Array< ModelConfigurationTypeFilterInput | null > | null,
  not?: ModelConfigurationTypeFilterInput | null,
};

export type ModelTenantFilterInput = {
  id?: ModelIDInput | null,
  tenantId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  verified?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTenantFilterInput | null > | null,
  or?: Array< ModelTenantFilterInput | null > | null,
  not?: ModelTenantFilterInput | null,
};

export type ModelTenantConnection = {
  __typename: "ModelTenantConnection",
  items?:  Array<Tenant | null > | null,
  nextToken?: string | null,
};

export type ModelJobFilterInput = {
  id?: ModelIDInput | null,
  state?: ModelStringInput | null,
  jobType?: ModelStringInput | null,
  message?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  timeToLive?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelJobFilterInput | null > | null,
  or?: Array< ModelJobFilterInput | null > | null,
  not?: ModelJobFilterInput | null,
};

export type ModelDeviceFilterInput = {
  id?: ModelIDInput | null,
  deviceId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  value?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelDeviceFilterInput | null > | null,
  or?: Array< ModelDeviceFilterInput | null > | null,
  not?: ModelDeviceFilterInput | null,
};

export type ModelConfigurationFilterInput = {
  id?: ModelIDInput | null,
  graphId?: ModelStringInput | null,
  graphCreatedAt?: ModelStringInput | null,
  graphIsDeleted?: ModelBooleanInput | null,
  and?: Array< ModelConfigurationFilterInput | null > | null,
  or?: Array< ModelConfigurationFilterInput | null > | null,
  not?: ModelConfigurationFilterInput | null,
};

export type ModelConfigurationVersionFilterInput = {
  id?: ModelIDInput | null,
  displayName?: ModelStringInput | null,
  graphModifiedAt?: ModelStringInput | null,
  value?: ModelStringInput | null,
  version?: ModelStringInput | null,
  isNewest?: ModelBooleanInput | null,
  and?: Array< ModelConfigurationVersionFilterInput | null > | null,
  or?: Array< ModelConfigurationVersionFilterInput | null > | null,
  not?: ModelConfigurationVersionFilterInput | null,
};

export type TriggerTenantVerificationMutationVariables = {
  tenantId?: string | null,
};

export type TriggerTenantVerificationMutation = {
  triggerTenantVerification?: string | null,
};

export type TriggerTenantUpdateMutationVariables = {
  tenantId?: string | null,
};

export type TriggerTenantUpdateMutation = {
  triggerTenantUpdate?: string | null,
};

export type TriggerConfigurationUpdateMutationVariables = {
  tenantId?: string | null,
  newConfigurationVersionId?: string | null,
  msGraphResource?: string | null,
};

export type TriggerConfigurationUpdateMutation = {
  triggerConfigurationUpdate?: string | null,
};

export type CreateDeviceMutationVariables = {
  input?: CreateDeviceInput,
  condition?: ModelDeviceConditionInput | null,
};

export type CreateDeviceMutation = {
  createDevice?:  {
    __typename: "Device",
    id: string,
    deviceId?: string | null,
    name: string,
    value: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type UpdateDeviceMutationVariables = {
  input?: UpdateDeviceInput,
  condition?: ModelDeviceConditionInput | null,
};

export type UpdateDeviceMutation = {
  updateDevice?:  {
    __typename: "Device",
    id: string,
    deviceId?: string | null,
    name: string,
    value: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type DeleteDeviceMutationVariables = {
  input?: DeleteDeviceInput,
  condition?: ModelDeviceConditionInput | null,
};

export type DeleteDeviceMutation = {
  deleteDevice?:  {
    __typename: "Device",
    id: string,
    deviceId?: string | null,
    name: string,
    value: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type CreateMsGraphResourceMutationVariables = {
  input?: CreateMSGraphResourceInput,
  condition?: ModelMSGraphResourceConditionInput | null,
};

export type CreateMsGraphResourceMutation = {
  createMSGraphResource?:  {
    __typename: "MSGraphResource",
    id: string,
    name: string,
    resource: string,
    version: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    configurationTypes?:  {
      __typename: "ModelConfigurationTypeConnection",
      items?:  Array< {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateMsGraphResourceMutationVariables = {
  input?: UpdateMSGraphResourceInput,
  condition?: ModelMSGraphResourceConditionInput | null,
};

export type UpdateMsGraphResourceMutation = {
  updateMSGraphResource?:  {
    __typename: "MSGraphResource",
    id: string,
    name: string,
    resource: string,
    version: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    configurationTypes?:  {
      __typename: "ModelConfigurationTypeConnection",
      items?:  Array< {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteMsGraphResourceMutationVariables = {
  input?: DeleteMSGraphResourceInput,
  condition?: ModelMSGraphResourceConditionInput | null,
};

export type DeleteMsGraphResourceMutation = {
  deleteMSGraphResource?:  {
    __typename: "MSGraphResource",
    id: string,
    name: string,
    resource: string,
    version: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    configurationTypes?:  {
      __typename: "ModelConfigurationTypeConnection",
      items?:  Array< {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateConfigurationTypeMutationVariables = {
  input?: CreateConfigurationTypeInput,
  condition?: ModelConfigurationTypeConditionInput | null,
};

export type CreateConfigurationTypeMutation = {
  createConfigurationType?:  {
    __typename: "ConfigurationType",
    id: string,
    odataType: string,
    platform: string,
    category: string,
    label: string,
    msGraphResource:  {
      __typename: "MSGraphResource",
      id: string,
      name: string,
      resource: string,
      version: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      configurationTypes?:  {
        __typename: "ModelConfigurationTypeConnection",
        nextToken?: string | null,
      } | null,
    },
    createdAt: string,
    updatedAt: string,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateConfigurationTypeMutationVariables = {
  input?: UpdateConfigurationTypeInput,
  condition?: ModelConfigurationTypeConditionInput | null,
};

export type UpdateConfigurationTypeMutation = {
  updateConfigurationType?:  {
    __typename: "ConfigurationType",
    id: string,
    odataType: string,
    platform: string,
    category: string,
    label: string,
    msGraphResource:  {
      __typename: "MSGraphResource",
      id: string,
      name: string,
      resource: string,
      version: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      configurationTypes?:  {
        __typename: "ModelConfigurationTypeConnection",
        nextToken?: string | null,
      } | null,
    },
    createdAt: string,
    updatedAt: string,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteConfigurationTypeMutationVariables = {
  input?: DeleteConfigurationTypeInput,
  condition?: ModelConfigurationTypeConditionInput | null,
};

export type DeleteConfigurationTypeMutation = {
  deleteConfigurationType?:  {
    __typename: "ConfigurationType",
    id: string,
    odataType: string,
    platform: string,
    category: string,
    label: string,
    msGraphResource:  {
      __typename: "MSGraphResource",
      id: string,
      name: string,
      resource: string,
      version: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      configurationTypes?:  {
        __typename: "ModelConfigurationTypeConnection",
        nextToken?: string | null,
      } | null,
    },
    createdAt: string,
    updatedAt: string,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateConfigurationMutationVariables = {
  input?: CreateConfigurationInput,
  condition?: ModelConfigurationConditionInput | null,
};

export type CreateConfigurationMutation = {
  createConfiguration?:  {
    __typename: "Configuration",
    id: string,
    graphId: string,
    configurationType:  {
      __typename: "ConfigurationType",
      id: string,
      odataType: string,
      platform: string,
      category: string,
      label: string,
      msGraphResource:  {
        __typename: "MSGraphResource",
        id: string,
        name: string,
        resource: string,
        version: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    graphCreatedAt: string,
    graphIsDeleted: boolean,
    createdAt: string,
    updatedAt: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    configurationVersions?:  {
      __typename: "ModelConfigurationVersionConnection",
      items?:  Array< {
        __typename: "ConfigurationVersion",
        id: string,
        displayName: string,
        graphModifiedAt: string,
        value: string,
        version: string,
        isNewest: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateConfigurationMutationVariables = {
  input?: UpdateConfigurationInput,
  condition?: ModelConfigurationConditionInput | null,
};

export type UpdateConfigurationMutation = {
  updateConfiguration?:  {
    __typename: "Configuration",
    id: string,
    graphId: string,
    configurationType:  {
      __typename: "ConfigurationType",
      id: string,
      odataType: string,
      platform: string,
      category: string,
      label: string,
      msGraphResource:  {
        __typename: "MSGraphResource",
        id: string,
        name: string,
        resource: string,
        version: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    graphCreatedAt: string,
    graphIsDeleted: boolean,
    createdAt: string,
    updatedAt: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    configurationVersions?:  {
      __typename: "ModelConfigurationVersionConnection",
      items?:  Array< {
        __typename: "ConfigurationVersion",
        id: string,
        displayName: string,
        graphModifiedAt: string,
        value: string,
        version: string,
        isNewest: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteConfigurationMutationVariables = {
  input?: DeleteConfigurationInput,
  condition?: ModelConfigurationConditionInput | null,
};

export type DeleteConfigurationMutation = {
  deleteConfiguration?:  {
    __typename: "Configuration",
    id: string,
    graphId: string,
    configurationType:  {
      __typename: "ConfigurationType",
      id: string,
      odataType: string,
      platform: string,
      category: string,
      label: string,
      msGraphResource:  {
        __typename: "MSGraphResource",
        id: string,
        name: string,
        resource: string,
        version: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    graphCreatedAt: string,
    graphIsDeleted: boolean,
    createdAt: string,
    updatedAt: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    configurationVersions?:  {
      __typename: "ModelConfigurationVersionConnection",
      items?:  Array< {
        __typename: "ConfigurationVersion",
        id: string,
        displayName: string,
        graphModifiedAt: string,
        value: string,
        version: string,
        isNewest: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateConfigurationVersionMutationVariables = {
  input?: CreateConfigurationVersionInput,
  condition?: ModelConfigurationVersionConditionInput | null,
};

export type CreateConfigurationVersionMutation = {
  createConfigurationVersion?:  {
    __typename: "ConfigurationVersion",
    id: string,
    displayName: string,
    graphModifiedAt: string,
    value: string,
    version: string,
    isNewest: boolean,
    createdAt: string,
    updatedAt: string,
    configuration:  {
      __typename: "Configuration",
      id: string,
      graphId: string,
      configurationType:  {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      },
      graphCreatedAt: string,
      graphIsDeleted: boolean,
      createdAt: string,
      updatedAt: string,
      tenant:  {
        __typename: "Tenant",
        id: string,
        tenantId: string,
        name: string,
        verified?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      },
      owner?: string | null,
      configurationVersions?:  {
        __typename: "ModelConfigurationVersionConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type UpdateConfigurationVersionMutationVariables = {
  input?: UpdateConfigurationVersionInput,
  condition?: ModelConfigurationVersionConditionInput | null,
};

export type UpdateConfigurationVersionMutation = {
  updateConfigurationVersion?:  {
    __typename: "ConfigurationVersion",
    id: string,
    displayName: string,
    graphModifiedAt: string,
    value: string,
    version: string,
    isNewest: boolean,
    createdAt: string,
    updatedAt: string,
    configuration:  {
      __typename: "Configuration",
      id: string,
      graphId: string,
      configurationType:  {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      },
      graphCreatedAt: string,
      graphIsDeleted: boolean,
      createdAt: string,
      updatedAt: string,
      tenant:  {
        __typename: "Tenant",
        id: string,
        tenantId: string,
        name: string,
        verified?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      },
      owner?: string | null,
      configurationVersions?:  {
        __typename: "ModelConfigurationVersionConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type DeleteConfigurationVersionMutationVariables = {
  input?: DeleteConfigurationVersionInput,
  condition?: ModelConfigurationVersionConditionInput | null,
};

export type DeleteConfigurationVersionMutation = {
  deleteConfigurationVersion?:  {
    __typename: "ConfigurationVersion",
    id: string,
    displayName: string,
    graphModifiedAt: string,
    value: string,
    version: string,
    isNewest: boolean,
    createdAt: string,
    updatedAt: string,
    configuration:  {
      __typename: "Configuration",
      id: string,
      graphId: string,
      configurationType:  {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      },
      graphCreatedAt: string,
      graphIsDeleted: boolean,
      createdAt: string,
      updatedAt: string,
      tenant:  {
        __typename: "Tenant",
        id: string,
        tenantId: string,
        name: string,
        verified?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      },
      owner?: string | null,
      configurationVersions?:  {
        __typename: "ModelConfigurationVersionConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type CreateTenantMutationVariables = {
  input?: CreateTenantInput,
  condition?: ModelTenantConditionInput | null,
};

export type CreateTenantMutation = {
  createTenant?:  {
    __typename: "Tenant",
    id: string,
    tenantId: string,
    name: string,
    verified?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      items?:  Array< {
        __typename: "Job",
        id: string,
        state: string,
        jobType: string,
        message?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        timeToLive: number,
        owner: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelDeviceConnection",
      items?:  Array< {
        __typename: "Device",
        id: string,
        deviceId?: string | null,
        name: string,
        value: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateTenantMutationVariables = {
  input?: UpdateTenantInput,
  condition?: ModelTenantConditionInput | null,
};

export type UpdateTenantMutation = {
  updateTenant?:  {
    __typename: "Tenant",
    id: string,
    tenantId: string,
    name: string,
    verified?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      items?:  Array< {
        __typename: "Job",
        id: string,
        state: string,
        jobType: string,
        message?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        timeToLive: number,
        owner: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelDeviceConnection",
      items?:  Array< {
        __typename: "Device",
        id: string,
        deviceId?: string | null,
        name: string,
        value: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteTenantMutationVariables = {
  input?: DeleteTenantInput,
  condition?: ModelTenantConditionInput | null,
};

export type DeleteTenantMutation = {
  deleteTenant?:  {
    __typename: "Tenant",
    id: string,
    tenantId: string,
    name: string,
    verified?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      items?:  Array< {
        __typename: "Job",
        id: string,
        state: string,
        jobType: string,
        message?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        timeToLive: number,
        owner: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelDeviceConnection",
      items?:  Array< {
        __typename: "Device",
        id: string,
        deviceId?: string | null,
        name: string,
        value: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateJobMutationVariables = {
  input?: CreateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type CreateJobMutation = {
  createJob?:  {
    __typename: "Job",
    id: string,
    state: string,
    jobType: string,
    message?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    timeToLive: number,
    owner: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type UpdateJobMutationVariables = {
  input?: UpdateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type UpdateJobMutation = {
  updateJob?:  {
    __typename: "Job",
    id: string,
    state: string,
    jobType: string,
    message?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    timeToLive: number,
    owner: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type DeleteJobMutationVariables = {
  input?: DeleteJobInput,
  condition?: ModelJobConditionInput | null,
};

export type DeleteJobMutation = {
  deleteJob?:  {
    __typename: "Job",
    id: string,
    state: string,
    jobType: string,
    message?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    timeToLive: number,
    owner: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type GetMsGraphResourceQueryVariables = {
  id?: string,
};

export type GetMsGraphResourceQuery = {
  getMSGraphResource?:  {
    __typename: "MSGraphResource",
    id: string,
    name: string,
    resource: string,
    version: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    configurationTypes?:  {
      __typename: "ModelConfigurationTypeConnection",
      items?:  Array< {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListMsGraphResourcesQueryVariables = {
  filter?: ModelMSGraphResourceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMsGraphResourcesQuery = {
  listMSGraphResources?:  {
    __typename: "ModelMSGraphResourceConnection",
    items?:  Array< {
      __typename: "MSGraphResource",
      id: string,
      name: string,
      resource: string,
      version: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      configurationTypes?:  {
        __typename: "ModelConfigurationTypeConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetConfigurationTypeQueryVariables = {
  id?: string,
};

export type GetConfigurationTypeQuery = {
  getConfigurationType?:  {
    __typename: "ConfigurationType",
    id: string,
    odataType: string,
    platform: string,
    category: string,
    label: string,
    msGraphResource:  {
      __typename: "MSGraphResource",
      id: string,
      name: string,
      resource: string,
      version: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      configurationTypes?:  {
        __typename: "ModelConfigurationTypeConnection",
        nextToken?: string | null,
      } | null,
    },
    createdAt: string,
    updatedAt: string,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListConfigurationTypesQueryVariables = {
  filter?: ModelConfigurationTypeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConfigurationTypesQuery = {
  listConfigurationTypes?:  {
    __typename: "ModelConfigurationTypeConnection",
    items?:  Array< {
      __typename: "ConfigurationType",
      id: string,
      odataType: string,
      platform: string,
      category: string,
      label: string,
      msGraphResource:  {
        __typename: "MSGraphResource",
        id: string,
        name: string,
        resource: string,
        version: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListTenantsQueryVariables = {
  filter?: ModelTenantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTenantsQuery = {
  listTenants?:  {
    __typename: "ModelTenantConnection",
    items?:  Array< {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTenantQueryVariables = {
  id?: string,
};

export type GetTenantQuery = {
  getTenant?:  {
    __typename: "Tenant",
    id: string,
    tenantId: string,
    name: string,
    verified?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      items?:  Array< {
        __typename: "Job",
        id: string,
        state: string,
        jobType: string,
        message?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        timeToLive: number,
        owner: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelDeviceConnection",
      items?:  Array< {
        __typename: "Device",
        id: string,
        deviceId?: string | null,
        name: string,
        value: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetJobQueryVariables = {
  id?: string,
};

export type GetJobQuery = {
  getJob?:  {
    __typename: "Job",
    id: string,
    state: string,
    jobType: string,
    message?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    timeToLive: number,
    owner: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type ListJobsQueryVariables = {
  filter?: ModelJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListJobsQuery = {
  listJobs?:  {
    __typename: "ModelJobConnection",
    items?:  Array< {
      __typename: "Job",
      id: string,
      state: string,
      jobType: string,
      message?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      timeToLive: number,
      owner: string,
      tenant:  {
        __typename: "Tenant",
        id: string,
        tenantId: string,
        name: string,
        verified?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      },
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetDeviceQueryVariables = {
  id?: string,
};

export type GetDeviceQuery = {
  getDevice?:  {
    __typename: "Device",
    id: string,
    deviceId?: string | null,
    name: string,
    value: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type ListDevicesQueryVariables = {
  filter?: ModelDeviceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDevicesQuery = {
  listDevices?:  {
    __typename: "ModelDeviceConnection",
    items?:  Array< {
      __typename: "Device",
      id: string,
      deviceId?: string | null,
      name: string,
      value: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      tenant:  {
        __typename: "Tenant",
        id: string,
        tenantId: string,
        name: string,
        verified?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      },
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListConfigurationsQueryVariables = {
  filter?: ModelConfigurationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConfigurationsQuery = {
  listConfigurations?:  {
    __typename: "ModelConfigurationConnection",
    items?:  Array< {
      __typename: "Configuration",
      id: string,
      graphId: string,
      configurationType:  {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      },
      graphCreatedAt: string,
      graphIsDeleted: boolean,
      createdAt: string,
      updatedAt: string,
      tenant:  {
        __typename: "Tenant",
        id: string,
        tenantId: string,
        name: string,
        verified?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      },
      owner?: string | null,
      configurationVersions?:  {
        __typename: "ModelConfigurationVersionConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetConfigurationQueryVariables = {
  id?: string,
};

export type GetConfigurationQuery = {
  getConfiguration?:  {
    __typename: "Configuration",
    id: string,
    graphId: string,
    configurationType:  {
      __typename: "ConfigurationType",
      id: string,
      odataType: string,
      platform: string,
      category: string,
      label: string,
      msGraphResource:  {
        __typename: "MSGraphResource",
        id: string,
        name: string,
        resource: string,
        version: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    graphCreatedAt: string,
    graphIsDeleted: boolean,
    createdAt: string,
    updatedAt: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    configurationVersions?:  {
      __typename: "ModelConfigurationVersionConnection",
      items?:  Array< {
        __typename: "ConfigurationVersion",
        id: string,
        displayName: string,
        graphModifiedAt: string,
        value: string,
        version: string,
        isNewest: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetConfigurationVersionQueryVariables = {
  id?: string,
};

export type GetConfigurationVersionQuery = {
  getConfigurationVersion?:  {
    __typename: "ConfigurationVersion",
    id: string,
    displayName: string,
    graphModifiedAt: string,
    value: string,
    version: string,
    isNewest: boolean,
    createdAt: string,
    updatedAt: string,
    configuration:  {
      __typename: "Configuration",
      id: string,
      graphId: string,
      configurationType:  {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      },
      graphCreatedAt: string,
      graphIsDeleted: boolean,
      createdAt: string,
      updatedAt: string,
      tenant:  {
        __typename: "Tenant",
        id: string,
        tenantId: string,
        name: string,
        verified?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      },
      owner?: string | null,
      configurationVersions?:  {
        __typename: "ModelConfigurationVersionConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type ListConfigurationVersionsQueryVariables = {
  filter?: ModelConfigurationVersionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConfigurationVersionsQuery = {
  listConfigurationVersions?:  {
    __typename: "ModelConfigurationVersionConnection",
    items?:  Array< {
      __typename: "ConfigurationVersion",
      id: string,
      displayName: string,
      graphModifiedAt: string,
      value: string,
      version: string,
      isNewest: boolean,
      createdAt: string,
      updatedAt: string,
      configuration:  {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMsGraphResourceSubscription = {
  onCreateMSGraphResource?:  {
    __typename: "MSGraphResource",
    id: string,
    name: string,
    resource: string,
    version: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    configurationTypes?:  {
      __typename: "ModelConfigurationTypeConnection",
      items?:  Array< {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateMsGraphResourceSubscription = {
  onUpdateMSGraphResource?:  {
    __typename: "MSGraphResource",
    id: string,
    name: string,
    resource: string,
    version: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    configurationTypes?:  {
      __typename: "ModelConfigurationTypeConnection",
      items?:  Array< {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteMsGraphResourceSubscription = {
  onDeleteMSGraphResource?:  {
    __typename: "MSGraphResource",
    id: string,
    name: string,
    resource: string,
    version: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    configurationTypes?:  {
      __typename: "ModelConfigurationTypeConnection",
      items?:  Array< {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateConfigurationTypeSubscription = {
  onCreateConfigurationType?:  {
    __typename: "ConfigurationType",
    id: string,
    odataType: string,
    platform: string,
    category: string,
    label: string,
    msGraphResource:  {
      __typename: "MSGraphResource",
      id: string,
      name: string,
      resource: string,
      version: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      configurationTypes?:  {
        __typename: "ModelConfigurationTypeConnection",
        nextToken?: string | null,
      } | null,
    },
    createdAt: string,
    updatedAt: string,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateConfigurationTypeSubscription = {
  onUpdateConfigurationType?:  {
    __typename: "ConfigurationType",
    id: string,
    odataType: string,
    platform: string,
    category: string,
    label: string,
    msGraphResource:  {
      __typename: "MSGraphResource",
      id: string,
      name: string,
      resource: string,
      version: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      configurationTypes?:  {
        __typename: "ModelConfigurationTypeConnection",
        nextToken?: string | null,
      } | null,
    },
    createdAt: string,
    updatedAt: string,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteConfigurationTypeSubscription = {
  onDeleteConfigurationType?:  {
    __typename: "ConfigurationType",
    id: string,
    odataType: string,
    platform: string,
    category: string,
    label: string,
    msGraphResource:  {
      __typename: "MSGraphResource",
      id: string,
      name: string,
      resource: string,
      version: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      configurationTypes?:  {
        __typename: "ModelConfigurationTypeConnection",
        nextToken?: string | null,
      } | null,
    },
    createdAt: string,
    updatedAt: string,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateTenantSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateTenantSubscription = {
  onCreateTenant?:  {
    __typename: "Tenant",
    id: string,
    tenantId: string,
    name: string,
    verified?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      items?:  Array< {
        __typename: "Job",
        id: string,
        state: string,
        jobType: string,
        message?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        timeToLive: number,
        owner: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelDeviceConnection",
      items?:  Array< {
        __typename: "Device",
        id: string,
        deviceId?: string | null,
        name: string,
        value: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateTenantSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateTenantSubscription = {
  onUpdateTenant?:  {
    __typename: "Tenant",
    id: string,
    tenantId: string,
    name: string,
    verified?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      items?:  Array< {
        __typename: "Job",
        id: string,
        state: string,
        jobType: string,
        message?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        timeToLive: number,
        owner: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelDeviceConnection",
      items?:  Array< {
        __typename: "Device",
        id: string,
        deviceId?: string | null,
        name: string,
        value: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteTenantSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteTenantSubscription = {
  onDeleteTenant?:  {
    __typename: "Tenant",
    id: string,
    tenantId: string,
    name: string,
    verified?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      items?:  Array< {
        __typename: "Job",
        id: string,
        state: string,
        jobType: string,
        message?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        timeToLive: number,
        owner: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelDeviceConnection",
      items?:  Array< {
        __typename: "Device",
        id: string,
        deviceId?: string | null,
        name: string,
        value: string,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    configurations?:  {
      __typename: "ModelConfigurationConnection",
      items?:  Array< {
        __typename: "Configuration",
        id: string,
        graphId: string,
        graphCreatedAt: string,
        graphIsDeleted: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateJobSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateJobSubscription = {
  onCreateJob?:  {
    __typename: "Job",
    id: string,
    state: string,
    jobType: string,
    message?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    timeToLive: number,
    owner: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type OnUpdateJobSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateJobSubscription = {
  onUpdateJob?:  {
    __typename: "Job",
    id: string,
    state: string,
    jobType: string,
    message?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    timeToLive: number,
    owner: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type OnDeleteJobSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteJobSubscription = {
  onDeleteJob?:  {
    __typename: "Job",
    id: string,
    state: string,
    jobType: string,
    message?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    timeToLive: number,
    owner: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type OnCreateDeviceSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateDeviceSubscription = {
  onCreateDevice?:  {
    __typename: "Device",
    id: string,
    deviceId?: string | null,
    name: string,
    value: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type OnUpdateDeviceSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateDeviceSubscription = {
  onUpdateDevice?:  {
    __typename: "Device",
    id: string,
    deviceId?: string | null,
    name: string,
    value: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type OnDeleteDeviceSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteDeviceSubscription = {
  onDeleteDevice?:  {
    __typename: "Device",
    id: string,
    deviceId?: string | null,
    name: string,
    value: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type OnCreateConfigurationSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateConfigurationSubscription = {
  onCreateConfiguration?:  {
    __typename: "Configuration",
    id: string,
    graphId: string,
    configurationType:  {
      __typename: "ConfigurationType",
      id: string,
      odataType: string,
      platform: string,
      category: string,
      label: string,
      msGraphResource:  {
        __typename: "MSGraphResource",
        id: string,
        name: string,
        resource: string,
        version: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    graphCreatedAt: string,
    graphIsDeleted: boolean,
    createdAt: string,
    updatedAt: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    configurationVersions?:  {
      __typename: "ModelConfigurationVersionConnection",
      items?:  Array< {
        __typename: "ConfigurationVersion",
        id: string,
        displayName: string,
        graphModifiedAt: string,
        value: string,
        version: string,
        isNewest: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateConfigurationSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateConfigurationSubscription = {
  onUpdateConfiguration?:  {
    __typename: "Configuration",
    id: string,
    graphId: string,
    configurationType:  {
      __typename: "ConfigurationType",
      id: string,
      odataType: string,
      platform: string,
      category: string,
      label: string,
      msGraphResource:  {
        __typename: "MSGraphResource",
        id: string,
        name: string,
        resource: string,
        version: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    graphCreatedAt: string,
    graphIsDeleted: boolean,
    createdAt: string,
    updatedAt: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    configurationVersions?:  {
      __typename: "ModelConfigurationVersionConnection",
      items?:  Array< {
        __typename: "ConfigurationVersion",
        id: string,
        displayName: string,
        graphModifiedAt: string,
        value: string,
        version: string,
        isNewest: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteConfigurationSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteConfigurationSubscription = {
  onDeleteConfiguration?:  {
    __typename: "Configuration",
    id: string,
    graphId: string,
    configurationType:  {
      __typename: "ConfigurationType",
      id: string,
      odataType: string,
      platform: string,
      category: string,
      label: string,
      msGraphResource:  {
        __typename: "MSGraphResource",
        id: string,
        name: string,
        resource: string,
        version: string,
        createdAt?: string | null,
        updatedAt?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    graphCreatedAt: string,
    graphIsDeleted: boolean,
    createdAt: string,
    updatedAt: string,
    tenant:  {
      __typename: "Tenant",
      id: string,
      tenantId: string,
      name: string,
      verified?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
      jobs?:  {
        __typename: "ModelJobConnection",
        nextToken?: string | null,
      } | null,
      devices?:  {
        __typename: "ModelDeviceConnection",
        nextToken?: string | null,
      } | null,
      configurations?:  {
        __typename: "ModelConfigurationConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    configurationVersions?:  {
      __typename: "ModelConfigurationVersionConnection",
      items?:  Array< {
        __typename: "ConfigurationVersion",
        id: string,
        displayName: string,
        graphModifiedAt: string,
        value: string,
        version: string,
        isNewest: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateConfigurationVersionSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateConfigurationVersionSubscription = {
  onCreateConfigurationVersion?:  {
    __typename: "ConfigurationVersion",
    id: string,
    displayName: string,
    graphModifiedAt: string,
    value: string,
    version: string,
    isNewest: boolean,
    createdAt: string,
    updatedAt: string,
    configuration:  {
      __typename: "Configuration",
      id: string,
      graphId: string,
      configurationType:  {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      },
      graphCreatedAt: string,
      graphIsDeleted: boolean,
      createdAt: string,
      updatedAt: string,
      tenant:  {
        __typename: "Tenant",
        id: string,
        tenantId: string,
        name: string,
        verified?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      },
      owner?: string | null,
      configurationVersions?:  {
        __typename: "ModelConfigurationVersionConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type OnUpdateConfigurationVersionSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateConfigurationVersionSubscription = {
  onUpdateConfigurationVersion?:  {
    __typename: "ConfigurationVersion",
    id: string,
    displayName: string,
    graphModifiedAt: string,
    value: string,
    version: string,
    isNewest: boolean,
    createdAt: string,
    updatedAt: string,
    configuration:  {
      __typename: "Configuration",
      id: string,
      graphId: string,
      configurationType:  {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      },
      graphCreatedAt: string,
      graphIsDeleted: boolean,
      createdAt: string,
      updatedAt: string,
      tenant:  {
        __typename: "Tenant",
        id: string,
        tenantId: string,
        name: string,
        verified?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      },
      owner?: string | null,
      configurationVersions?:  {
        __typename: "ModelConfigurationVersionConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};

export type OnDeleteConfigurationVersionSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteConfigurationVersionSubscription = {
  onDeleteConfigurationVersion?:  {
    __typename: "ConfigurationVersion",
    id: string,
    displayName: string,
    graphModifiedAt: string,
    value: string,
    version: string,
    isNewest: boolean,
    createdAt: string,
    updatedAt: string,
    configuration:  {
      __typename: "Configuration",
      id: string,
      graphId: string,
      configurationType:  {
        __typename: "ConfigurationType",
        id: string,
        odataType: string,
        platform: string,
        category: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      },
      graphCreatedAt: string,
      graphIsDeleted: boolean,
      createdAt: string,
      updatedAt: string,
      tenant:  {
        __typename: "Tenant",
        id: string,
        tenantId: string,
        name: string,
        verified?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        owner?: string | null,
      },
      owner?: string | null,
      configurationVersions?:  {
        __typename: "ModelConfigurationVersionConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
  } | null,
};
