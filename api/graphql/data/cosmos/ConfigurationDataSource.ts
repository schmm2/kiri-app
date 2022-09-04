import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { IConfigurationDataSource, ConfigurationModel, ModelType } from "../types";

export class ConfigurationDataSource
  extends CosmosDataSource<ConfigurationModel, any>
  implements IConfigurationDataSource {

  async getConfigurations() {
    const Configurations = await this.findManyByQuery({
      query: "SELECT * FROM c",
      parameters: [],
    });
    return Configurations.resources;
  }

  async getConfiguration(id: string) {
    const Configuration = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id",
      parameters: [
        { name: "@id", value: id }
      ],
    });

    return Configuration.resources[0];
  }

  /*async createConfiguration(graphId: string, graphCreatedAt: string) {
    const newConfiguration: ConfigurationModel = {
      id: idGenerator(),
      modelType: ModelType.Configuration,
      graphId,
      graphCreatedAt,
      configurationVersions: []
    };

    const savedConfiguration = await this.createOne(newConfiguration);

    return savedConfiguration.resource;
  }*/

  /*async updateConfiguration(Configuration: ConfigurationModel) {
    const response = await this.container
      .item(Configuration.id, Configuration.modelType)
      .replace(Configuration);

    return response.resource;
  }*/
}
