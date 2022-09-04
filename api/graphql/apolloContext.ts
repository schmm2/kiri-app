import {
  IConfigurationDataSource,
  IMsGraphResourceDataSource,
  ITenantDataSource,
} from "./data/types";

export type ApolloContext = {
  dataSources: {
    tenant: ITenantDataSource,
    configuration: IConfigurationDataSource,
    msgraphresource: IMsGraphResourceDataSource
  };
};
