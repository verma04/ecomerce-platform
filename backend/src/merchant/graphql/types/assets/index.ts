const { ApolloServer, gql } = require("apollo-server-express");

// const { Parking } = require('../models/Parking');
const imagesTypes = gql`
  scalar Date
  scalar Upload

  type images {
    url: String
    description: String
    caption: String
    alt: String
    id: String
  }
  type Query {
    getAllImages: [images]
  }

  type status {
    status: Boolean
  }

  type Mutation {
    addImage(
      file: Upload!
      description: String!
      caption: String!
      alt: String!
    ): images
    updateImage(
      url: String!
      description: String!
      caption: String!
      alt: String!
      id: ID!
    ): images
  }
`;

export { imagesTypes };
