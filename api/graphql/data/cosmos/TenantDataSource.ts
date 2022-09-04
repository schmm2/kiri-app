import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { ITenantDataSource, TenantModel, ModelType } from "../types";

export class TenantDataSource
  extends CosmosDataSource<TenantModel, any>
  implements ITenantDataSource {

  async getTenants() {
    const Tenants = await this.findManyByQuery({
      query: "SELECT * FROM c",
      parameters: [],
    });
    return Tenants.resources;
  }

  async getTenant(id: string) {
    const Tenant = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id",
      parameters: [
        { name: "@id", value: id }
      ],
    });

    return Tenant.resources[0];
  }

  async createTenant(name: string, tenantId: string, appId: string ) {
    const newTenant: TenantModel = {
      id: idGenerator(),
      modelType: ModelType.Tenant,
      name,
      tenantId,
      appId
    };

    const savedTenant = await this.createOne(newTenant);

    return savedTenant.resource;
  }

  async updateTenant(Tenant: TenantModel) {
    const response = await this.container
      .item(Tenant.id, Tenant.modelType)
      .replace(Tenant);

    return response.resource;
  }
}
