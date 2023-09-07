import { gql } from "@apollo/client";

export const SELLER_EMAIL_REGISTRATION = gql`
  mutation Mutation(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    sellerRegistration(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      token
    }
  }
`;

export const SELLER_GOOGLE_REGISTRATION = gql`
  mutation SellerGoogleRegistration(
    $email: String!
    $sellerGoogleRegistrationId: ID!
    $firstName: String!
    $lastName: String!
  ) {
    sellerGoogleRegistration(
      email: $email
      id: $sellerGoogleRegistrationId
      firstName: $firstName
      lastName: $lastName
    ) {
      token
    }
  }
`;

export const SELLER_LOGIN = gql`
  mutation SellerLogin($email: String!) {
    sellerLogin(email: $email) {
      status
      email
    }
  }
`;

export const SELLER_LOGIN_PASSWORD = gql`
  mutation SellerLoginWithPassword($email: String!, $password: String!) {
    sellerLoginWithPassword(email: $email, password: $password) {
      token
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    getUser {
      kyc
      email
      sellerProfile {
        firstName
        lastName
        logo {
          alt
          description
          url
        }
        slug
        storeName
      }
    }
  }
`;

export const SELLER_GOOGLE_LOGIN = gql`
  mutation SellerGoogleLogin($email: String!, $sellerGoogleLoginId: ID!) {
    sellerGoogleLogin(email: $email, id: $sellerGoogleLoginId) {
      token
      loginType
    }
  }
`;
