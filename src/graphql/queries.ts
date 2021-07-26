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


export const configurationVersionManySortModified = gql`
query configurationVersionManySortModified{
  configurationVersionMany(sort: GRAPHMODIFIEDAT_DESC){
      displayName,
      graphModifiedAt,
      _id,
      state
      configuration{
        _id
        tenant{
          _id
        },
        configurationType{
          name,
          category
        }
      }
    }
  }
`

export const configurationById = gql`
  query ConfigurationById($id: MongoID!) {
    configurationById(_id: $id) {
      _id   
      graphId
      graphCreatedAt
      configurationVersions(sort: GRAPHMODIFIEDAT_DESC) {
        _id
        displayName
        isNewest
        graphModifiedAt
        value
        state
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

export const getNewestConfigurationVersionsOfTenants = gql`
  query GetNewestConfigurationVersions {
    tenantMany {
      _id 
      configurations {       
        _id 
        newestActiveConfigurationVersions {
          _id
          displayName
          isNewest
          graphModifiedAt  
          state
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

export const getTenantNewestActiveConfigurationVersions = gql`
  query GetTenantConfigurationVersions($id: MongoID!) {
    tenantById(_id: $id) {
      _id 
      configurations {       
        _id 
        newestActiveConfigurationVersions {
          _id
          displayName
          isNewest
          graphModifiedAt  
          state
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

export const getTenantNewestConfigurationVersions = gql`
  query GetTenantConfigurationVersions($id: MongoID!) {
    tenantById(_id: $id) {
      _id 
      configurations {       
        _id 
        newestConfigurationVersions {
          _id
          displayName
          isNewest
          graphModifiedAt  
          state
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
      updatedAt,
      configurationTypes{
        name
      }
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
      appId
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