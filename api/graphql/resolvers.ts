import { arrayRandomiser } from "../utils";
import { ModelType } from "./data/types";
import { Resolvers } from "./generated";

const resolvers: Resolvers = {
  Query: {
    tenantById(_, { id }, { dataSources }) {
      return dataSources.tenant.getTenant(id);
    },
    tenantMany(_, __, { dataSources }) {
      return dataSources.tenant.getTenants();
    },
    msGraphResourceById(_, {id}, { dataSources }){
      return dataSources.msgraphresource.getMsGraphResource(id);
    },
    msGraphResourceMany(_, __, { dataSources }){
      return dataSources.msgraphresource.getMsGraphResources();
    },
    configurationMany(_, __, { dataSources }){
      return dataSources.configuration.getConfigurations();
    },
    configurationById(_, {id}, { dataSources }){
      return dataSources.configuration.getConfiguration(id);
    },
  },
  Configuration: {
    async tenant(configuration, _, { dataSources }) {
      const games = await dataSources.tenant.getTenant(configuration.tenant.id);

      return games;
    },
  }
};

export default resolvers;
