const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const authTypes = gql`
  scalar Date
  scalar Upload
  type getUser {
    name: String
  }
  type getCategory {
    id: ID
    title: String
  }
  type token {
    token: String
  }
  type image {
    url: String
    alt: String
    description: String
  }
  type qrcode {
    qrcode: String
  }

  type gstIn {
    id: ID
    gstIn: String
  }

  type sellerProfile {
    name: String
    slug: String
    category: getCategory
    logo: image
  }

  type Query {
    getUser: getUser
    getCategory: getCategory
    checkEmailToken(token: String!): status
  }

  type status {
    status: Boolean
  }
  type address {
    addressLine1: String
    addressLine2: String
    landMark: String
    state: String
    city: String
    pinCode: String
  }

  type Mutation {
    sellerRegistration(email: String!, name: String!, password: String!): token
    sellerLogin(email: String!, password: String!): token
    sellerProfile(name: String!, category: ID!, sellerLogo: ID!): sellerProfile
    verifyEmail(token: String!): token
    sellerKyc(gstIn: String!): gstIn
    sellerAddress(
      addressLine1: String!
      addressLine2: String!
      landMark: String!
      state: String!
      city: String!
      pinCode: String!
    ): address
  }
`;

export { authTypes };
