import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { CreateConfigurationTypeInput } from "../../generated";
import { IConfigurationTypeDataSource, ConfigurationTypeModel, ModelType } from "../types";

export class ConfigurationTypeDataSource
  extends CosmosDataSource<ConfigurationTypeModel, any>
  implements IConfigurationTypeDataSource {

  async getConfigurationTypes() {
    console.log("ctypes")
    const ConfigurationTypes = await this.findManyByQuery({
      query: "SELECT * FROM configurationType",
      parameters: [],
    });
    console.log(ConfigurationTypes)
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

  async getConfigurationTypeByMsGraphResource(msGraphResourceId: string) {
    const ConfigurationType = await this.findManyByQuery({
      query: "SELECT * FROM c WHERE c.msGraphResource = @id",
      parameters: [
        { name: "@id", value: msGraphResourceId }
      ],
    });

    return ConfigurationType.resources;
  }

  async createConfigurationType(record: CreateConfigurationTypeInput) {
    const newConfigurationType: ConfigurationTypeModel = {
      id: idGenerator(),
      modelType: ModelType.ConfigurationType,
      name: record.name,
      category: record.category,
      platform: record.platform,
      msGraphResource: record.msGraphResource
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
