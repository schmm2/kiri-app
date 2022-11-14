import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { arrayRandomiser, idGenerator } from "../../../utils";
import { IJobDataSource, JobModel, ModelType, MsGraphResourceModel } from "../types";

export class JobDataSource
  extends CosmosDataSource<JobModel, any>
  implements IJobDataSource {

  async getJobs() {
    const Jobs = await this.findManyByQuery({
      query: "SELECT * FROM c",
      parameters: [],
    });
    return Jobs.resources;
  }

  async getJob(id: string) {
    const Job = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id",
      parameters: [
        { name: "@id", value: id }
      ],
    });

    return Job.resources[0];
  }
}
