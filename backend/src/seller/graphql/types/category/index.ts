const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const categoryTypes = gql`
  type sellerCategory {
    id: ID
    category: category
    subCategory: category
    product: [sellerProduct]
    description: String
    categoryImage: images
    status: Boolean
    sort: Int
    title: String
  }
  type category {
    id: ID
    title: String
    subCategory: [sellerCategory]
  }

  type Query {
    getSellerCategory: [sellerCategory]
    getCategorySelect: [category]
  }

  type Mutation {
    addSellerCategory(
      category: String!
      subCategory: String!
      description: String
      categoryImage: String
    ): sellerCategory
  }
`;

export { categoryTypes };
