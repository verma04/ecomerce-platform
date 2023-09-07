const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const authTypes = gql`
  scalar Date
  scalar Upload
  type getUser {
    sellerProfile: sellerProfile
    kyc: Boolean
    email: String
  }
  type getCategory {
    id: ID
    title: String
  }
  type token {
    token: String
    loginType: String
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
    slug: String
    category: getCategory
    logo: image
    storeName: String
    firstName: String
    lastName: String
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
  type email {
    status: Boolean
    email: String
  }

  type Mutation {
    sellerRegistration(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
    ): token
    sellerLogin(email: String!): email
    sellerLoginWithPassword(email: String!, password: String!): token
    sellerGoogleLogin(email: String!, id: ID!): token
    sellerGoogleRegistration(
      email: String!
      id: ID!
      firstName: String!
      lastName: String!
    ): token

    verifyEmail(token: String!): token
  }
`;

export { authTypes };
