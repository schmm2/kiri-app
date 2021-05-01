const getTenantNewestConfigurationVersions = `
  query GetTenantConfigurationVersions($id: ID!) {
    getTenant(id: $id) {
      id 
      configurations {
        items {
          id
          graphIsDeleted
          configurationVersions(filter: {isNewest: {eq: true}}) {
            items{
              id
              displayName
              isNewest
              graphModifiedAt
            }
            nextToken
          }
          configurationType {
            platform
            category
            label
          }
        }
        nextToken
      }
    }
  }
`

export { getTenantNewestConfigurationVersions }