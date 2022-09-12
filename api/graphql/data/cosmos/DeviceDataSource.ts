import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { IDeviceDataSource, DeviceModel, ModelType } from "../types";

export class DeviceDataSource
  extends CosmosDataSource<DeviceModel, any>
  implements IDeviceDataSource {

  async getDevices() {
    const Devices = await this.findManyByQuery({
      query: "SELECT * FROM c",
      parameters: [],
    });
    return Devices.resources;
  }

  async getDevice(id: string) {
    const Device = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id",
      parameters: [
        { name: "@id", value: id }
      ],
    });

    return Device.resources[0];
  }
}
