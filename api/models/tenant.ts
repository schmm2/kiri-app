const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { composeWithMongoose } = require("graphql-compose-mongoose");
const tenantSchema = new Schema({
    id: {
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
   }
}, {
    timestamps: true
});

var Tenants = 
module.exports = {
    TenantSchema: mongoose.model('Tenant', tenantSchema),
    TenantTC: composeWithMongoose(mongoose.model('Tenant', tenantSchema))
};