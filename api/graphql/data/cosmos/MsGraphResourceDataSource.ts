import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
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

  async createMsGraphResource(name: string, resource: string, version: string, category: string, nameAttribute: string,  expandAttributes: string[]) {
    
    const newMsGraphResource: MsGraphResourceModel = {
      id: idGenerator(),
      modelType: ModelType.MsGraphResource,
      name,
      resource,
      version,
      nameAttribute,
      category,
      expandAttributes
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
