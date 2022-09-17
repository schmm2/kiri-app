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
    msGraphResourceById(_, { id }, { dataSources }) {
      return dataSources.msgraphresource.getMsGraphResource(id);
    },
    msGraphResourceMany(_, __, { dataSources }) {
      return dataSources.msgraphresource.getMsGraphResources();
    },
    configurationMany(_, __, { dataSources }) {
      return dataSources.configuration.getConfigurations();
    },
    configurationById(_, { id }, { dataSources }) {
      return dataSources.configuration.getConfiguration(id);
    },
    deploymentMany(_, __, { dataSources }) {
      return dataSources.deployment.getDeployments();
    },
  },
  Deployment: {
    async targetTenants(deployment, args, { dataSources }) {
      let tenants = [];
      if (deployment.targetTenants && deployment.targetTenants.length > 0) {
        tenants = await dataSources.tenant.getTenantsByIds(
          deployment.targetTenants
        );
      }
      return tenants;
    },
  },
  Mutation: {
    async createTenant(_, { record }, { dataSources }) {
      const newTenant = await dataSources.tenant.createTenant(record);
      return newTenant;
    },
    async createDeployment(_, { record }, { dataSources }) {
      console.log(record);
      const newDeployment = await dataSources.deployment.createDeployment(
        record
      );
      console.log(newDeployment);
      return newDeployment;
    },
  }
};

export default resolvers;
