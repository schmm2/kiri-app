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
      return dataSources.msGraphResource.getMsGraphResource(id);
    },
    msGraphResourceMany(_, __, { dataSources }) {
      return dataSources.msGraphResource.getMsGraphResources();
    },
    configurationTypeMany(_, __, { dataSources }) {
      return dataSources.configurationType.getConfigurationTypes();
    },
    configurationTypeById(_, { id }, { dataSources }) {
      return dataSources.configurationType.getConfigurationType(id);
    },
    configurationMany(_, __, { dataSources }) {
      return dataSources.configuration.getConfigurations();
    },
    configurationVersionMany(_, __, { dataSources }) {
      return dataSources.configurationVersion.getConfigurationVersions();
    },
    configurationById(_, { id }, { dataSources }) {
      return dataSources.configuration.getConfiguration(id);
    },
    deploymentMany(_, __, { dataSources }) {
      return dataSources.deployment.getDeployments();
    },
    deploymentById(_, {id}, { dataSources }) {
      return dataSources.deployment.getDeployment(id);
    },
    jobMany(_, __, { dataSources }) {
      return dataSources.job.getJobs();
    },
    jobById(_, {id}, { dataSources }) {
      return dataSources.job.getJob(id);
    }
  },
  ConfigurationVersion: {
    async configuration(configuration, args, { dataSources }) {
      return dataSources.configuration.getConfiguration(configuration.id)
    }
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
  MsGraphResource: {
    async configurationTypes(msGraphResource, args, { dataSources }) {
      let configurationTypes = dataSources.configurationType.getConfigurationTypeByMsGraphResource(msGraphResource.id)
      return configurationTypes
    },
  },
  Mutation: {
    async createTenant(_, { record }, { dataSources }) {
      const newTenant = await dataSources.tenant.createTenant(record);
      return newTenant;
    },
    async createDeployment(_, { record }, { dataSources }) {
      const newDeployment = await dataSources.deployment.createDeployment(
        record
      );
      return newDeployment;
    },
  },
};

export default resolvers;
