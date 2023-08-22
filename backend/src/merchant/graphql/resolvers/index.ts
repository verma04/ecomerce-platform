const { GraphQLUpload } = require("graphql-upload");

import { authResolvers } from "./auth";

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    ...authResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
  },
};

export default resolvers;
