const { GraphQLUpload } = require("graphql-upload");

import { authResolvers } from "./auth";
import { categoryResolvers } from "./category";
import { assetsResolvers } from "./assets";
import { productResolvers } from "./product";
const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    ...authResolvers.Query,
    ...categoryResolvers.Query,
    ...assetsResolvers.Query,
    ...productResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...assetsResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...productResolvers.Mutation,
  },
};

export default resolvers;
