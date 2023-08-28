const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const productTypes = gql`
  type sellerProduct {
    id: ID
    title: String
    description: String
  }

  type Query {
    getSellerProduct: [sellerProduct]
  }

  type color {
    title: String
    color: [array]
    images: images
  }
  type array {
    title: String
  }

  type Mutation {
    addSellerProduct(
      productName: String!
      description: String!
      categoryImage: String!
      productCategory: String!
      productImage: String!
      brandName: String!
    ): sellerProduct
    editProductColor(productId: String!, title: String, sizes: String!): color
    editProductSize(productId: String!, title: String, sizes: String!): color
    createVariants(productId: String!): sellerProduct
  }
`;

export { productTypes };
