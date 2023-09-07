import { gql } from "@apollo/client";

export const GET_ALL_ASSEST = gql`
  query Query {
    getAllImages {
      alt
      caption
      description
      id
      url
    }
  }
`;

export const ADD_IMAGE = gql`
  mutation Mutation(
    $file: Upload!
    $description: String!
    $caption: String!
    $alt: String!
  ) {
    addImage(
      file: $file
      description: $description
      caption: $caption
      alt: $alt
    ) {
      alt
      caption
      description
      id
      url
    }
  }
`;
