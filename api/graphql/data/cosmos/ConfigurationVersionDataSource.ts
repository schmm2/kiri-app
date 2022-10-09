import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { ConfigurationVersion } from "../../generated";
import {
  IConfigurationVersionDataSource,
  ConfigurationVersionModel,
  ModelType,
} from "../types";

export class ConfigurationVersionDataSource
  extends CosmosDataSource<ConfigurationVersionModel, any>
  implements IConfigurationVersionDataSource
{
  async getConfigurationVersions() {
    console.log("sssssss");
    const ConfigurationVersions = await this.findManyByQuery({
      query: "SELECT * FROM c",
      parameters: [],
    });
    return ConfigurationVersions.resources;
  }

  async getConfigurationVersion(id: string) {
    const ConfigurationVersion = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE configurationVersion.id = @id",
      parameters: [{ name: "@id", value: id }],
    });
    return ConfigurationVersion.resources[0];
  }
}
