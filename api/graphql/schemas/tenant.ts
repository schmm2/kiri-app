const { TenantTC } = require("../models/tenant");

export const TenantQuery = {
    tenantById: TenantTC.getResolver("findById"),
    tenantMany: TenantTC.getResolver('findMany'),
}

export const TenantMutation = {
    tenantCreateOne: TenantTC.getResolver("createOne")
}
