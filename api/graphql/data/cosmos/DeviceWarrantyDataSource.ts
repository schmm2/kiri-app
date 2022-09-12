import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { IDeviceWarrantyDataSource, DeviceWarrantyModel, ModelType } from "../types";

export class DeviceWarrantyDataSource
  extends CosmosDataSource<DeviceWarrantyModel, any>
  implements IDeviceWarrantyDataSource {

  async getDeviceWarranties() {
    const DeviceWarrantys = await this.findManyByQuery({
      query: "SELECT * FROM c",
      parameters: [],
    });
    return DeviceWarrantys.resources;
  }

  async getDeviceWarranty(id: string) {
    const DeviceWarranty = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id",
      parameters: [
        { name: "@id", value: id }
      ],
    });

    return DeviceWarranty.resources[0];
  }
}
