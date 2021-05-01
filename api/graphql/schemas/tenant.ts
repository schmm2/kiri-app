const { tenantTC } = require("../../models/tenant");

export const tenantQuery = {
    tenantById: tenantTC.getResolver("findById"),
    tenantMany: tenantTC.getResolver('findMany'),
}

export const tenantMutation = {
    tenantCreateOne: tenantTC.getResolver("createOne")
}
