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
      graphId
      graphCreatedAt
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