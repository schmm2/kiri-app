const { SchemaComposer } = require('graphql-compose');
const schemaComposer = new SchemaComposer();

const { tenantQuery, tenantMutation } = require('./tenant');
const { msGraphResourceQuery, msGraphResourceMutation } = require('./msgraphresource');
const { configurationTypeQuery, configurationTypeMutation } = require('./configurationType');


schemaComposer.Query.addFields({
    ...tenantQuery,
    ...msGraphResourceQuery,
    ...configurationTypeQuery
})

schemaComposer.Mutation.addFields({
    ...tenantMutation,
    ...msGraphResourceMutation,
    ...configurationTypeMutation
})

module.exports = schemaComposer.buildSchema(); 