import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { IDeviceVersionDataSource, DeviceVersionModel, ModelType } from "../types";

export class DeviceVersionDataSource
  extends CosmosDataSource<DeviceVersionModel, any>
  implements IDeviceVersionDataSource {

  async getDeviceVersions() {
    const DeviceVersions = await this.findManyByQuery({
      query: "SELECT * FROM c",
      parameters: [],
    });
    return DeviceVersions.resources;
  }

  async getDeviceVersion(id: string) {
    const DeviceVersion = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id",
      parameters: [
        { name: "@id", value: id }
      ],
    });

    return DeviceVersion.resources[0];
  }
}
