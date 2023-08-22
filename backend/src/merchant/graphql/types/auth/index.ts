const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const authTypes = gql`
  scalar Date
  scalar Upload
  type getUser {
    name: String
  }

  type Query {
    getUser: getUser
  }

  type Mutation {
    addUser: getUser
  }
`;

export { authTypes };
