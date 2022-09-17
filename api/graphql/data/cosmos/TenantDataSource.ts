import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { CreateTenantInput } from "../../generated";
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

  async getTenantsByIds(ids: string[]) {
    const Tenants = await this.findManyByIds(ids)
    return Tenants;
  }

  async getTenant(id: string) {
    const Tenant = await this.findOneById(id);
    return Tenant;
  }

  async createTenant(record: CreateTenantInput) {
    console.log("reuqest new tenant")
    console.log(record);

    const newTenant: TenantModel = {
      id: idGenerator(),
      modelType: ModelType.Tenant,
      name: record.name,
      tenantId: record.tenantId,
      appId: record.appId
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
