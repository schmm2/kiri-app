import { gql, useMutation } from '@apollo/client';

// Tenant
export const tenantCreateOne = gql`
  mutation TenantCreateOne($record: CreateOneTenantInput!){
    tenantCreateOne(record: $record){
      record {
        _id
      }
    }
  }
`;

// MS Graph Resource
export const msGraphResourceCreateOne = gql`
  mutation MsGraphResourceCreateOne($record: CreateOneMsGraphResourceInput!){
    msGraphResourceCreateOne(record: $record){
      recordId
    }
  }
`;

export const msGraphResourceRemoveById = gql`
  mutation MsGraphResourceRemoveById($id: MongoID!) {
    msGraphResourceRemoveById(_id: $id) {
      recordId
    }
  }
 `;

// Configuration Type
export const configurationTypeRemoveById = gql`
  mutation ConfigurationTypeRemoveById($id: MongoID!) {
    configurationTypeRemoveById(_id: $id) {
      recordId
    }
  }
 `;

export const configurationTypeCreateOne = gql`
  mutation ConfigurationTypeCreateOne($record: CreateOneConfigurationTypeInput!){
    configurationTypeCreateOne(record: $record){
      record {
        _id
      }
    }
  }
`;




/* Auto generated AWS stuff */
export const triggerTenantVerification = /* GraphQL */ `
  mutation TriggerTenantVerification($tenantId: String) {
    triggerTenantVerification(tenantId: $tenantId)
  }
`;
export const triggerTenantUpdate = /* GraphQL */ `
  mutation TriggerTenantUpdate($tenantId: String) {
    triggerTenantUpdate(tenantId: $tenantId)
  }
`;
export const triggerConfigurationUpdate = /* GraphQL */ `
  mutation TriggerConfigurationUpdate(
    $tenantId: String
    $newConfigurationVersionId: String
    $msGraphResource: String
  ) {
    triggerConfigurationUpdate(
      tenantId: $tenantId
      newConfigurationVersionId: $newConfigurationVersionId
      msGraphResource: $msGraphResource
    )
  }
`;
export const createDevice = /* GraphQL */ `
  mutation CreateDevice(
    $input: CreateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    createDevice(input: $input, condition: $condition) {
      id
      deviceId
      name
      value
      createdAt
      updatedAt
      tenant {
        id
        tenantId
        name
        verified
        createdAt
        updatedAt
        owner
        jobs {
          nextToken
        }
        devices {
          nextToken
        }
        configurations {
          nextToken
        }
      }
      owner
    }
  }
`;
export const updateDevice = /* GraphQL */ `
  mutation UpdateDevice(
    $input: UpdateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    updateDevice(input: $input, condition: $condition) {
      id
      deviceId
      name
      value
      createdAt
      updatedAt
      tenant {
        id
        tenantId
        name
        verified
        createdAt
        updatedAt
        owner
        jobs {
          nextToken
        }
        devices {
          nextToken
        }
        configurations {
          nextToken
        }
      }
      owner
    }
  }
`;
export const deleteDevice = /* GraphQL */ `
  mutation DeleteDevice(
    $input: DeleteDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    deleteDevice(input: $input, condition: $condition) {
      id
      deviceId
      name
      value
      createdAt
      updatedAt
      tenant {
        id
        tenantId
        name
        verified
        createdAt
        updatedAt
        owner
        jobs {
          nextToken
        }
        devices {
          nextToken
        }
        configurations {
          nextToken
        }
      }
      owner
    }
  }
`;



export const updateMsGraphResource = /* GraphQL */ `
  mutation UpdateMsGraphResource(
    $input: UpdateMSGraphResourceInput!
    $condition: ModelMSGraphResourceConditionInput
  ) {
    updateMSGraphResource(input: $input, condition: $condition) {
      id
      name
      resource
      version
      createdAt
      updatedAt
      configurationTypes {
        items {
          id
          odataType
          platform
          category
          label
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteMsGraphResource = /* GraphQL */ `
  mutation DeleteMsGraphResource(
    $input: DeleteMSGraphResourceInput!
    $condition: ModelMSGraphResourceConditionInput
  ) {
    deleteMSGraphResource(input: $input, condition: $condition) {
      id
      name
      resource
      version
      createdAt
      updatedAt
      configurationTypes {
        items {
          id
          odataType
          platform
          category
          label
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createConfigurationType = /* GraphQL */ `
  mutation CreateConfigurationType(
    $input: CreateConfigurationTypeInput!
    $condition: ModelConfigurationTypeConditionInput
  ) {
    createConfigurationType(input: $input, condition: $condition) {
      id
      odataType
      platform
      category
      label
      msGraphResource {
        id
        name
        resource
        version
        createdAt
        updatedAt
        configurationTypes {
          nextToken
        }
      }
      createdAt
      updatedAt
      configurations {
        items {
          id
          graphId
          graphCreatedAt
          graphIsDeleted
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const updateConfigurationType = /* GraphQL */ `
  mutation UpdateConfigurationType(
    $input: UpdateConfigurationTypeInput!
    $condition: ModelConfigurationTypeConditionInput
  ) {
    updateConfigurationType(input: $input, condition: $condition) {
      id
      odataType
      platform
      category
      label
      msGraphResource {
        id
        name
        resource
        version
        createdAt
        updatedAt
        configurationTypes {
          nextToken
        }
      }
      createdAt
      updatedAt
      configurations {
        items {
          id
          graphId
          graphCreatedAt
          graphIsDeleted
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const deleteConfigurationType = /* GraphQL */ `
  mutation DeleteConfigurationType(
    $input: DeleteConfigurationTypeInput!
    $condition: ModelConfigurationTypeConditionInput
  ) {
    deleteConfigurationType(input: $input, condition: $condition) {
      id
      odataType
      platform
      category
      label
      msGraphResource {
        id
        name
        resource
        version
        createdAt
        updatedAt
        configurationTypes {
          nextToken
        }
      }
      createdAt
      updatedAt
      configurations {
        items {
          id
          graphId
          graphCreatedAt
          graphIsDeleted
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const createConfiguration = /* GraphQL */ `
  mutation CreateConfiguration(
    $input: CreateConfigurationInput!
    $condition: ModelConfigurationConditionInput
  ) {
    createConfiguration(input: $input, condition: $condition) {
      id
      graphId
      configurationType {
        id
        odataType
        platform
        category
        label
        msGraphResource {
          id
          name
          resource
          version
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        configurations {
          nextToken
        }
      }
      graphCreatedAt
      graphIsDeleted
      createdAt
      updatedAt
      tenant {
        id
        tenantId
        name
        verified
        createdAt
        updatedAt
        owner
        jobs {
          nextToken
        }
        devices {
          nextToken
        }
        configurations {
          nextToken
        }
      }
      owner
      configurationVersions {
        items {
          id
          displayName
          graphModifiedAt
          value
          version
          isNewest
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const updateConfiguration = /* GraphQL */ `
  mutation UpdateConfiguration(
    $input: UpdateConfigurationInput!
    $condition: ModelConfigurationConditionInput
  ) {
    updateConfiguration(input: $input, condition: $condition) {
      id
      graphId
      configurationType {
        id
        odataType
        platform
        category
        label
        msGraphResource {
          id
          name
          resource
          version
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        configurations {
          nextToken
        }
      }
      graphCreatedAt
      graphIsDeleted
      createdAt
      updatedAt
      tenant {
        id
        tenantId
        name
        verified
        createdAt
        updatedAt
        owner
        jobs {
          nextToken
        }
        devices {
          nextToken
        }
        configurations {
          nextToken
        }
      }
      owner
      configurationVersions {
        items {
          id
          displayName
          graphModifiedAt
          value
          version
          isNewest
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const deleteConfiguration = /* GraphQL */ `
  mutation DeleteConfiguration(
    $input: DeleteConfigurationInput!
    $condition: ModelConfigurationConditionInput
  ) {
    deleteConfiguration(input: $input, condition: $condition) {
      id
      graphId
      configurationType {
        id
        odataType
        platform
        category
        label
        msGraphResource {
          id
          name
          resource
          version
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        configurations {
          nextToken
        }
      }
      graphCreatedAt
      graphIsDeleted
      createdAt
      updatedAt
      tenant {
        id
        tenantId
        name
        verified
        createdAt
        updatedAt
        owner
        jobs {
          nextToken
        }
        devices {
          nextToken
        }
        configurations {
          nextToken
        }
      }
      owner
      configurationVersions {
        items {
          id
          displayName
          graphModifiedAt
          value
          version
          isNewest
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const createConfigurationVersion = /* GraphQL */ `
  mutation CreateConfigurationVersion(
    $input: CreateConfigurationVersionInput!
    $condition: ModelConfigurationVersionConditionInput
  ) {
    createConfigurationVersion(input: $input, condition: $condition) {
      id
      displayName
      graphModifiedAt
      value
      version
      isNewest
      createdAt
      updatedAt
      configuration {
        id
        graphId
        configurationType {
          id
          odataType
          platform
          category
          label
          createdAt
          updatedAt
        }
        graphCreatedAt
        graphIsDeleted
        createdAt
        updatedAt
        tenant {
          id
          tenantId
          name
          verified
          createdAt
          updatedAt
          owner
        }
        owner
        configurationVersions {
          nextToken
        }
      }
      owner
    }
  }
`;
export const updateConfigurationVersion = /* GraphQL */ `
  mutation UpdateConfigurationVersion(
    $input: UpdateConfigurationVersionInput!
    $condition: ModelConfigurationVersionConditionInput
  ) {
    updateConfigurationVersion(input: $input, condition: $condition) {
      id
      displayName
      graphModifiedAt
      value
      version
      isNewest
      createdAt
      updatedAt
      configuration {
        id
        graphId
        configurationType {
          id
          odataType
          platform
          category
          label
          createdAt
          updatedAt
        }
        graphCreatedAt
        graphIsDeleted
        createdAt
        updatedAt
        tenant {
          id
          tenantId
          name
          verified
          createdAt
          updatedAt
          owner
        }
        owner
        configurationVersions {
          nextToken
        }
      }
      owner
    }
  }
`;
export const deleteConfigurationVersion = /* GraphQL */ `
  mutation DeleteConfigurationVersion(
    $input: DeleteConfigurationVersionInput!
    $condition: ModelConfigurationVersionConditionInput
  ) {
    deleteConfigurationVersion(input: $input, condition: $condition) {
      id
      displayName
      graphModifiedAt
      value
      version
      isNewest
      createdAt
      updatedAt
      configuration {
        id
        graphId
        configurationType {
          id
          odataType
          platform
          category
          label
          createdAt
          updatedAt
        }
        graphCreatedAt
        graphIsDeleted
        createdAt
        updatedAt
        tenant {
          id
          tenantId
          name
          verified
          createdAt
          updatedAt
          owner
        }
        owner
        configurationVersions {
          nextToken
        }
      }
      owner
    }
  }
`;
export const createTenant = /* GraphQL */ `
  mutation CreateTenant(
    $input: CreateTenantInput!
    $condition: ModelTenantConditionInput
  ) {
    createTenant(input: $input, condition: $condition) {
      id
      tenantId
      name
      verified
      createdAt
      updatedAt
      owner
      jobs {
        items {
          id
          state
          jobType
          message
          createdAt
          updatedAt
          timeToLive
          owner
        }
        nextToken
      }
      devices {
        items {
          id
          deviceId
          name
          value
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      configurations {
        items {
          id
          graphId
          graphCreatedAt
          graphIsDeleted
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const updateTenant = /* GraphQL */ `
  mutation UpdateTenant(
    $input: UpdateTenantInput!
    $condition: ModelTenantConditionInput
  ) {
    updateTenant(input: $input, condition: $condition) {
      id
      tenantId
      name
      verified
      createdAt
      updatedAt
      owner
      jobs {
        items {
          id
          state
          jobType
          message
          createdAt
          updatedAt
          timeToLive
          owner
        }
        nextToken
      }
      devices {
        items {
          id
          deviceId
          name
          value
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      configurations {
        items {
          id
          graphId
          graphCreatedAt
          graphIsDeleted
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const deleteTenant = /* GraphQL */ `
  mutation DeleteTenant(
    $input: DeleteTenantInput!
    $condition: ModelTenantConditionInput
  ) {
    deleteTenant(input: $input, condition: $condition) {
      id
      tenantId
      name
      verified
      createdAt
      updatedAt
      owner
      jobs {
        items {
          id
          state
          jobType
          message
          createdAt
          updatedAt
          timeToLive
          owner
        }
        nextToken
      }
      devices {
        items {
          id
          deviceId
          name
          value
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      configurations {
        items {
          id
          graphId
          graphCreatedAt
          graphIsDeleted
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const createJob = /* GraphQL */ `
  mutation CreateJob(
    $input: CreateJobInput!
    $condition: ModelJobConditionInput
  ) {
    createJob(input: $input, condition: $condition) {
      id
      state
      jobType
      message
      createdAt
      updatedAt
      timeToLive
      owner
      tenant {
        id
        tenantId
        name
        verified
        createdAt
        updatedAt
        owner
        jobs {
          nextToken
        }
        devices {
          nextToken
        }
        configurations {
          nextToken
        }
      }
    }
  }
`;
export const updateJob = /* GraphQL */ `
  mutation UpdateJob(
    $input: UpdateJobInput!
    $condition: ModelJobConditionInput
  ) {
    updateJob(input: $input, condition: $condition) {
      id
      state
      jobType
      message
      createdAt
      updatedAt
      timeToLive
      owner
      tenant {
        id
        tenantId
        name
        verified
        createdAt
        updatedAt
        owner
        jobs {
          nextToken
        }
        devices {
          nextToken
        }
        configurations {
          nextToken
        }
      }
    }
  }
`;
export const deleteJob = /* GraphQL */ `
  mutation DeleteJob(
    $input: DeleteJobInput!
    $condition: ModelJobConditionInput
  ) {
    deleteJob(input: $input, condition: $condition) {
      id
      state
      jobType
      message
      createdAt
      updatedAt
      timeToLive
      owner
      tenant {
        id
        tenantId
        name
        verified
        createdAt
        updatedAt
        owner
        jobs {
          nextToken
        }
        devices {
          nextToken
        }
        configurations {
          nextToken
        }
      }
    }
  }
`;
