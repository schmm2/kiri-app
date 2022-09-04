/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMsGraphResource = /* GraphQL */ `
  subscription OnCreateMsGraphResource {
    onCreateMSGraphResource {
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
export const onUpdateMsGraphResource = /* GraphQL */ `
  subscription OnUpdateMsGraphResource {
    onUpdateMSGraphResource {
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
export const onDeleteMsGraphResource = /* GraphQL */ `
  subscription OnDeleteMsGraphResource {
    onDeleteMSGraphResource {
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
export const onCreateConfigurationType = /* GraphQL */ `
  subscription OnCreateConfigurationType {
    onCreateConfigurationType {
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
export const onUpdateConfigurationType = /* GraphQL */ `
  subscription OnUpdateConfigurationType {
    onUpdateConfigurationType {
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
export const onDeleteConfigurationType = /* GraphQL */ `
  subscription OnDeleteConfigurationType {
    onDeleteConfigurationType {
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
export const onCreateTenant = /* GraphQL */ `
  subscription OnCreateTenant($owner: String) {
    onCreateTenant(owner: $owner) {
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
export const onUpdateTenant = /* GraphQL */ `
  subscription OnUpdateTenant($owner: String) {
    onUpdateTenant(owner: $owner) {
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
export const onDeleteTenant = /* GraphQL */ `
  subscription OnDeleteTenant($owner: String) {
    onDeleteTenant(owner: $owner) {
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
export const onCreateJob = /* GraphQL */ `
  subscription OnCreateJob($owner: String) {
    onCreateJob(owner: $owner) {
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
export const onUpdateJob = /* GraphQL */ `
  subscription OnUpdateJob($owner: String) {
    onUpdateJob(owner: $owner) {
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
export const onDeleteJob = /* GraphQL */ `
  subscription OnDeleteJob($owner: String) {
    onDeleteJob(owner: $owner) {
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
export const onCreateDevice = /* GraphQL */ `
  subscription OnCreateDevice($owner: String) {
    onCreateDevice(owner: $owner) {
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
export const onUpdateDevice = /* GraphQL */ `
  subscription OnUpdateDevice($owner: String) {
    onUpdateDevice(owner: $owner) {
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
export const onDeleteDevice = /* GraphQL */ `
  subscription OnDeleteDevice($owner: String) {
    onDeleteDevice(owner: $owner) {
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
export const onCreateConfiguration = /* GraphQL */ `
  subscription OnCreateConfiguration($owner: String) {
    onCreateConfiguration(owner: $owner) {
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
export const onUpdateConfiguration = /* GraphQL */ `
  subscription OnUpdateConfiguration($owner: String) {
    onUpdateConfiguration(owner: $owner) {
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
export const onDeleteConfiguration = /* GraphQL */ `
  subscription OnDeleteConfiguration($owner: String) {
    onDeleteConfiguration(owner: $owner) {
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
export const onCreateConfigurationVersion = /* GraphQL */ `
  subscription OnCreateConfigurationVersion($owner: String) {
    onCreateConfigurationVersion(owner: $owner) {
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
export const onUpdateConfigurationVersion = /* GraphQL */ `
  subscription OnUpdateConfigurationVersion($owner: String) {
    onUpdateConfigurationVersion(owner: $owner) {
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
export const onDeleteConfigurationVersion = /* GraphQL */ `
  subscription OnDeleteConfigurationVersion($owner: String) {
    onDeleteConfigurationVersion(owner: $owner) {
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
