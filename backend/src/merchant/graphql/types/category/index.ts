const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const categoryTypes = gql`
  type sellerCategory {
    id: ID
    title: String
    description: String
    categoryImage: images
  }

  type Query {
    getSellerCategory: [sellerCategory]
  }

  type Mutation {
    addSellerCategory(
      title: String!
      description: String!
      categoryImage: String!
    ): sellerCategory
  }
`;

export { categoryTypes };
