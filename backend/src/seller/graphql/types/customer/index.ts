const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const customerTypes = gql`
  type customer {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    address: customerAddress
  }

  type customerAddress {
    addressLine1: String
    addressLine2: String
    landMark: String
    state: String
    city: String
    pinCode: String
    country: String
  }

  type Query {
    getAllCustomer: [customer]
  }

  type Mutation {
    addCustomer(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      address: String!
    ): customer
  }
`;

export { customerTypes };
