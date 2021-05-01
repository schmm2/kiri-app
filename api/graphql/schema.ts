import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type Tenant {
        id: ID!
        name: String!
        verified: Boolean
        jobs: [Job]
        createdAt: String
        updatedAt: String
    }

    type Job {
        id: ID!
        state: String!
        jobType: String!
        message: String
        tenant: Tenant!
        createdAt: String
        updatedAt: String
        timeToLive: Int!
    }

    type Query {
        appName: String!
    }
`;

export const resolvers = {
    Query: {
        appName() {
            return "kiri-app";
        }
    }
};