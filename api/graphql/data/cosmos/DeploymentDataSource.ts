import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { CreateDeploymentInput } from "../../generated";
import {
  IDeploymentDataSource,
  DeploymentModel,
  ModelType,
  ConfigurationModel,
  TenantModel,
} from "../types";

export class DeploymentDataSource
  extends CosmosDataSource<DeploymentModel, any>
  implements IDeploymentDataSource
{
  async getDeployments() {
    const Deployments = await this.findManyByQuery({
      query: "SELECT * FROM c",
      parameters: [],
    });
    return Deployments.resources;
  }

  async getDeployment(id: string) {
    const Deployment = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id",
      parameters: [{ name: "@id", value: id }],
    });

    return Deployment.resources[0];
  }

  async createDeployment(record: CreateDeploymentInput) {
    const newDeployment: DeploymentModel = {
      id: idGenerator(),
      modelType: ModelType.Deployment,
      name: record.name,
      configurations: record.configurations,
      targetTenants: record.targetTenants,
      executionDate: "",
      result: "",
    };

    const savedDeployment = await this.createOne(newDeployment);
    console.log(savedDeployment);

    return savedDeployment.resource;
  }

  async updateDeployment(Deployment: DeploymentModel) {
    const response = await this.container
      .item(Deployment.id, Deployment.modelType)
      .replace(Deployment);
    return response.resource;
  }
}
