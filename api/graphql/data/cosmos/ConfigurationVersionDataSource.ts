import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { Configuration } from "../../generated";
import {
  IConfigurationVersionDataSource,
  ConfigurationVersionModel,
  ModelType,
  ConfigurationModel,
} from "../types";

export class ConfigurationVersionDataSource
  extends CosmosDataSource<ConfigurationVersionModel, any>
  implements IConfigurationVersionDataSource
{
  async getConfigurationVersions() {
    const ConfigurationVersions = await this.findManyByQuery({
      query: "SELECT * FROM c",
      parameters: [],
    });
    return ConfigurationVersions.resources;
  }

  async getConfigurationVersion(id: string) {
    const ConfigurationVersion = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id",
      parameters: [{ name: "@id", value: id }],
    });

    return ConfigurationVersion.resources[0];
  }

  /*async createConfigurationVersion(
    displayName: string,
    value: string,
    graphModifiedAt: string,
    graphVersion: string,
    configuration: ConfigurationModel
  ) {
    const newConfigurationVersion: ConfigurationVersionModel = {
      id: idGenerator(),
      modelType: ModelType.ConfigurationVersion,
      displayName,
      graphModifiedAt,
      graphVersion,
      value,
      configuration
    };

    const savedConfigurationVersion = await this.createOne(
      newConfigurationVersion
    );

    return savedConfigurationVersion.resource;
  }

  async updateConfigurationVersion(ConfigurationVersion: ConfigurationVersionModel) {
    const response = await this.container
      .item(ConfigurationVersion.id, ConfigurationVersion.modelType)
      .replace(ConfigurationVersion);

    return response.resource;
  }*/
}
