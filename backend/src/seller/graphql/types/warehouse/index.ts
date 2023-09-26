const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const wareHouseTypes = gql`
  type wareHouse {
    id: ID
    wareHouseName: String
    contactPerson: String
    mobileNumber: String
    addressLine1: String
    addressLine2: String
    pinCode: String
    city: String
    state: String
    gstIn: String
    isPrimary: Boolean
  }

  type Query {
    getAllWareHouse: [wareHouse]
    getAllActiveWareHouse: [wareHouse]
    getSellerWareHouseById(id: ID): wareHouse
  }

  type Mutation {
    addSellerWarehouse(
      wareHouseName: String!
      contactPerson: String!
      mobileNumber: String!
      addressLine1: String!
      addressLine2: String!
      pinCode: String!
      city: String!
      state: String!
      gstIn: String!
    ): wareHouse
    editSellerWarehouse(
      id: ID!
      wareHouseName: String!
      contactPerson: String!
      mobileNumber: String!
      addressLine1: String!
      addressLine2: String!
      pinCode: String!
      city: String!
      state: String!
      gstIn: String!
    ): wareHouse
    changePrimaryWarehouse(id: ID): [wareHouse]
    disablePrimaryWarehouse(id: ID): wareHouse
  }
`;

export { wareHouseTypes };
