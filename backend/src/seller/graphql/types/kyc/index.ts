const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const kycTypes = gql`
  scalar Date
  scalar Upload

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
  type businessCategory {
    title: String
    id: ID
  }

  type id {
    id: ID
  }
  type address {
    addressLine1: String
    addressLine2: String
    landMark: String
    state: String
    city: String
    pinCode: String
  }
  type Query {
    getSellerProfile: sellerProfile
    getBusinessCategory: [businessCategory]
  }

  type Mutation {
    storeKyc(
      gstIn: String!
      storeName: String!
      logo: Upload
      businessCategory: String!
    ): gstIn
    sellerAddress(
      addressLine1: String!
      addressLine2: String!
      landMark: String!
      state: String!
      city: String!
      pinCode: String!
      country: String!
    ): id
    sellerProfile(
      firstName: String!
      lastName: String!
      phone: String!
    ): sellerProfile

    sellerBankAccount(
      accountNumber: String!
      ifscCode: String!
      bankName: String!
    ): id
  }
`;

export { kycTypes };
