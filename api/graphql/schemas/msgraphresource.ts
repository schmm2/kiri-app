const { MsGraphResourceTC } = require("../../models/msgraphresource");

export const MsGraphResourceQuery = {
    msGraphResourceById: MsGraphResourceTC.getResolver("findById"),
    msGraphResourceMany: MsGraphResourceTC.getResolver('findMany'),
}

export const MsGraphResourceMutation = {
    msGraphResourceCreateOne: MsGraphResourceTC.getResolver("createOne")
}
