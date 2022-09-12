import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { MsGraphResource } from "../../generated";
import { IConfigurationTypeDataSource, ConfigurationTypeModel, ModelType, MsGraphResourceModel } from "../types";

export class ConfigurationTypeDataSource
  extends CosmosDataSource<ConfigurationTypeModel, any>
  implements IConfigurationTypeDataSource {

  async getConfigurationTypes() {
    const ConfigurationTypes = await this.findManyByQuery({
      query: "SELECT * FROM c",
      parameters: [],
    });
    return ConfigurationTypes.resources;
  }

  async getConfigurationType(id: string) {
    const ConfigurationType = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id",
      parameters: [
        { name: "@id", value: id }
      ],
    });

    return ConfigurationType.resources[0];
  }

  async createConfigurationType(name: string, category: string, platform: string, msGraphResource: MsGraphResourceModel) {
    const newConfigurationType: ConfigurationTypeModel = {
      id: idGenerator(),
      modelType: ModelType.ConfigurationType,
      name,
      category,
      platform,
      msGraphResource
    };

    const savedConfigurationType = await this.createOne(newConfigurationType);

    return savedConfigurationType.resource;
  }

  async updateConfigurationType(ConfigurationType: ConfigurationTypeModel) {
    const response = await this.container
      .item(ConfigurationType.id, ConfigurationType.modelType)
      .replace(ConfigurationType);

    return response.resource;
  }
}
