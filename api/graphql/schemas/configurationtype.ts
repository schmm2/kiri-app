const { configurationTypeTC } = require("../../models/configurationtype");

export const configurationTypeQuery = {
    configurationTypeByIds: configurationTypeTC.getResolver("findByIds"),
    configurationTypeById: configurationTypeTC.getResolver("findById"),
    configurationTypeMany: configurationTypeTC.getResolver('findMany'),
}

export const configurationTypeMutation = {
    configurationTypeCreateOne: configurationTypeTC.getResolver("createOne"),
    configurationTypeRemoveById: configurationTypeTC.getResolver("removeById")
}
