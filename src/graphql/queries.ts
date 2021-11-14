import { gql } from '@apollo/client';

// Devices
export const deviceMany = gql`
  query DeviceMany {
    deviceMany{
      _id,
      deviceId,
      tenant {
        _id
      }
    }
  }
`

export const getNewestDeviceVersions = gql`
  query GetNewestDeviceVersions {
    deviceMany { 
      tenant {
        _id
      }    
      newestDeviceVersions {
        deviceName
        manufacturer
        operatingSystem
        osVersion
        osVersionName
        upn
        value
        _id
      }
      _id
    }
  }
`

export const deviceById = gql`
  query deviceById($id: MongoID!) {
    deviceById(_id: $id) {
      _id,
      newestDeviceVersions {
        deviceName
        manufacturer
        operatingSystem
        osVersion
        osVersionName
        upn
        value
        _id
      }
    } 
  }
`


// Device Versions
export const deviceVersionMany = gql`
  query DeviceVersionMany($filter: FilterFindManyDeviceVersionInput) {
    deviceVersionMany(filter: $filter) {
      manufacturer
      device {
        tenant {
          _id
        }
      }
      operatingSystem
      osVersion
      upn
      value
      deviceName
      _id
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
query configurationVersionManySortModified($limit: Int){
  configurationVersionMany(sort: GRAPHMODIFIEDAT_DESC, limit: $limit){
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

export const getNewestConfigurationVersions = gql`
  query GetNewestConfigurationVersions($limit: Int, $filter: FilterFindManyConfigurationInput) {
    configurationMany(limit: $limit, filter: $filter) {       
      _id 
      newestConfigurationVersions {
        _id
        displayName
        isNewest
        graphModifiedAt  
        state
      }
      tenant {
        name
        _id
      }
      configurationType {
        platform
        category
        name
      }
    } 
  }
`

export const getNewestConfigurationVersionsByTenant = gql`
  query getNewestConfigurationVersionsByTenant($id: MongoID!) {
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
      log,
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
      objectDeepResolve,
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


// Deployment
export const deploymentMany = gql`
  query DeploymentMany {
    deploymentMany { 
      _id
      name
      createdAt
      updatedAt
      tenants {
        _id
      }
      configurations {
        _id
      }
    }
  }
`

export const deploymentById = gql`
  query DeploymentById($id: MongoID!) {
    deploymentById(_id: $id) {
      _id,
      name
      tenants {
        _id
        name
      }
      configurations{
        _id
        newestConfigurationVersion {
          _id
          displayName
          isNewest
          graphModifiedAt  
          state
        }
        configurationType {
          _id
          name
        }
      }
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