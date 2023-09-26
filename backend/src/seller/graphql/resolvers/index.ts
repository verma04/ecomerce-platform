const { GraphQLUpload } = require("graphql-upload");

import { authResolvers } from "./auth";
import { categoryResolvers } from "./category";
import { assetsResolvers } from "./assets";
import { productResolvers } from "./product";
import { kycResolvers } from "./kyc";
import { warehouseResolvers } from "./warehouse";
const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    ...authResolvers.Query,
    ...categoryResolvers.Query,
    ...assetsResolvers.Query,
    ...productResolvers.Query,
    ...kycResolvers.Query,
    ...warehouseResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...assetsResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...productResolvers.Mutation,
    ...kycResolvers.Mutation,
    ...warehouseResolvers.Mutation,
  },
};

export default resolvers;
