const { msGraphResourceTC } = require("../../models/msgraphresource");

msGraphResourceTC.addRelation(
    'configurationTypes',
    {
      resolver: () => msGraphResourceTC.getResolver("dataLoaderMany"),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.configurationTypes,
      },
      projection: { configurationTypes: 1 }, // point fields in source object, which should be fetched from DB
    }
  );

export const msGraphResourceQuery = {
    msGraphResourceByIds: msGraphResourceTC.getResolver("findByIds"),
    msGraphResourceById: msGraphResourceTC.getResolver("findById"),
    msGraphResourceMany: msGraphResourceTC.getResolver('findMany'),
}

export const msGraphResourceMutation = {
    msGraphResourceCreateOne: msGraphResourceTC.getResolver("createOne")
}
