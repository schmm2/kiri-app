import { gql } from '@apollo/client';

// Devices
export const deviceMany = gql`
  query DeviceMany {
    deviceMany{
      _id,
      deviceId,
      manufacturer,
      value
    }
  }
`

// Configuration
export const configurationMany = gql`
  query ConfigurationMany {
    configurationMany {
      _id,
      createdAt,
      updatedAt
    }
  }
`

export const configurationById = gql`
  query ConfigurationById($id: MongoID!) {
    configurationById(_id: $id) {
      _id   
      graphIsDeleted
      configurationVersions {
        _id
        displayName
        isNewest
        graphModifiedAt
        value
      }
      tenant{
        _id,
        name
      }
      configurationType {
        platform
        category
        name
        msGraphResource{
          name,
          resource
        }
      }
    }
  }
`

export const getTenantNewestConfigurationVersions = gql`
  query GetTenantConfigurationVersions($id: MongoID!) {
    tenantById(_id: $id) {
      _id 
      configurations {       
        _id
        graphIsDeleted
        newestConfigurationVersions {
          _id
          displayName
          isNewest
          graphModifiedAt  
        }
        configurationType {
          platform
          category
          name
        }
      }
    }
  }
`

// Jobs
export const jobMany = gql`
  query JobMany($filter: FilterFindManyJobInput) {
    jobMany(filter: $filter) {
      _id,
      type,
      state,
      message,
      updatedAt,
      tenant {
        name
      }
    }
  }
`

// MS Graph Resource
export const msGraphResourceMany = gql`
  query MsGraphResourceMany {
    msGraphResourceMany {
      _id,
      name,
      resource,
      version,
      createdAt,
      updatedAt
    }
  }
`

// Configuration Type
export const configurationTypeMany = gql`
  query ConfigurationTypeMany {
    configurationTypeMany { 
      _id
      platform
      category
      name
      createdAt
      updatedAt
    }
  }
`

// Tenant
export const tenantMany = gql`
  query TenantMany {
    tenantMany { 
      _id
      tenantId
      name
      verified
      createdAt
      updatedAt
    }
  }
`

export const tenantById = gql`
  query TenantById($id: MongoID!) {
    tenantById(_id: $id) {
      _id   
      name
    }
  }
`

/* Auto generated AWS stuff */

export const getMsGraphResource = /* GraphQL */ `
  query GetMsGraphResource($id: ID!) {
    getMSGraphResource(id: $id) {
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

export const listMsGraphResources = /* GraphQL */ `
  query ListMsGraphResources(
    $filter: ModelMSGraphResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMSGraphResources(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getConfigurationType = /* GraphQL */ `
  query GetConfigurationType($id: ID!) {
    getConfigurationType(id: $id) {
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
export const listConfigurationTypes = /* GraphQL */ `
  query ListConfigurationTypes(
    $filter: ModelConfigurationTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConfigurationTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listTenants = /* GraphQL */ `
  query ListTenants(
    $filter: ModelTenantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTenants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getTenant = /* GraphQL */ `
  query GetTenant($id: ID!) {
    getTenant(id: $id) {
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
export const getJob = /* GraphQL */ `
  query GetJob($id: ID!) {
    getJob(id: $id) {
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
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
      }
      nextToken
    }
  }
`;
export const getDevice = /* GraphQL */ `
  query GetDevice($id: ID!) {
    getDevice(id: $id) {
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
export const listDevices = /* GraphQL */ `
  query ListDevices(
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
        owner
      }
      nextToken
    }
  }
`;
export const listConfigurations = /* GraphQL */ `
  query ListConfigurations(
    $filter: ModelConfigurationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConfigurations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getConfiguration = /* GraphQL */ `
  query GetConfiguration($id: ID!) {
    getConfiguration(id: $id) {
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
export const getConfigurationVersion = /* GraphQL */ `
  query GetConfigurationVersion($id: ID!) {
    getConfigurationVersion(id: $id) {
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
export const listConfigurationVersions = /* GraphQL */ `
  query ListConfigurationVersions(
    $filter: ModelConfigurationVersionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConfigurationVersions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          graphCreatedAt
          graphIsDeleted
          createdAt
          updatedAt
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
