const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const productTypes = gql`
  type sellerProduct {
    isActive: Boolean
    productInformation: productInformation
    inventory: inventory
    sellerCategory: sellerCategory
    productVariant: [productVariant]
    variant: [variant]
    id: String
    img: [images]
  }
  type productInformation {
    id: String
    productName: String
    price: Int
    discountedPrice: Int
    productPerUnit: Int
    unit: String
  }
  type inventory {
    id: String
    quantity: Int
    sku: String
    warehouse: wareHouse
  }
  type variant {
    name: String
    type: String
    variantList: [variantList]
  }

  type variantList {
    id: String
    value: String
  }
  type combination {
    id: String
    value: String
    name: String
  }

  type productVariant {
    id: String
    discountedPrice: Int
    price: Int
    stock: Int
    combination: [combination]
  }

  type Query {
    getSellerProduct: [sellerProduct]
  }

  type Mutation {
    addSellerProduct(
      productInformation: String!
      variant: String!
      inventory: String!
      variantGenerated: String
      img: String!
    ): sellerProduct
    changeProductStatus(id: String!, status: Boolean!): sellerProduct
  }
`;

export { productTypes };
