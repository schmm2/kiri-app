const { SchemaComposer } = require('graphql-compose');
const schemaComposer = new SchemaComposer();

const { TenantQuery, TenantMutation } = require('./tenant');

schemaComposer.Query.addFields({
    ...TenantQuery
})

schemaComposer.Mutation.addFields({
    ...TenantMutation
})

module.exports = schemaComposer.buildSchema();