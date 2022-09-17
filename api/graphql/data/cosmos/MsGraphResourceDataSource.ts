import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { CreateMsGraphResourceInput } from "../../generated";
import { IMsGraphResourceDataSource, MsGraphResourceModel, ModelType } from "../types";

export class MsGraphResourceDataSource
  extends CosmosDataSource<MsGraphResourceModel, any>
  implements IMsGraphResourceDataSource {

  async getMsGraphResources() {
    const MsGraphResources = await this.findManyByQuery({
      query: "SELECT * FROM c",
      parameters: [],
    });
    return MsGraphResources.resources;
  }

  async getMsGraphResource(id: string) {
    const MsGraphResource = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id",
      parameters: [
        { name: "@id", value: id }
      ],
    });

    return MsGraphResource.resources[0];
  }

  async createMsGraphResource(record: CreateMsGraphResourceInput) {
    
    const newMsGraphResource: MsGraphResourceModel = {
      id: idGenerator(),
      modelType: ModelType.MsGraphResource,
      name: record.name,
      resource: record.resource,
      version: record.version,
      nameAttribute: record.nameAttribute,
      category: record.category,
      expandAttributes: record.expandAttributes
    };

    const savedMsGraphResource = await this.createOne(newMsGraphResource);

    return savedMsGraphResource.resource;
  }

  async updateMsGraphResource(MsGraphResource: MsGraphResourceModel) {
    const response = await this.container
      .item(MsGraphResource.id, MsGraphResource.modelType)
      .replace(MsGraphResource);

    return response.resource;
  }
}