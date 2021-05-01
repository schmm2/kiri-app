const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { composeWithMongoose } = require("graphql-compose-mongoose");

const tenantSchema = new Schema({
    tenant: {
       type: String,
       required: true
    },
    name: {
       type: String,
       required: true
    },
    verified: {
       type: String,
       required: true
   },

}, {
    timestamps: true
});

export const TenantTC = mongoose.model('Tenant', tenantSchema);
    