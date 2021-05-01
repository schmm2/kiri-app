const { SchemaComposer } = require('graphql-compose');
const schemaComposer = new SchemaComposer();

const { TenantQuery, TenantMutation } = require('./tenant');
const { MsGraphResourceQuery, MsGraphResourceMutation } = require('./msgraphresource');

schemaComposer.Query.addFields({
    ...TenantQuery,
    ...MsGraphResourceQuery
})

schemaComposer.Mutation.addFields({
    ...TenantMutation,
    ...MsGraphResourceMutation
})

module.exports = schemaComposer.buildSchema();