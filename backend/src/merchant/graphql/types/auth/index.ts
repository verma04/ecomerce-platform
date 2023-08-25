const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const authTypes = gql`
  scalar Date
  scalar Upload
  type getUser {
    name: String
  }
  type token {
    token: String
  }

  type Query {
    getUser: getUser
    checkEmailToken(token: String!): status
  }
  type status {
    status: Boolean
  }

  type Mutation {
    sellerRegistration(email: String!, name: String!, password: String!): token
    verifyEmail(token: String!): token
  }
`;

export { authTypes };
