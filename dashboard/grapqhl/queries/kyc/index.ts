import { gql } from "@apollo/client";

export const SELLER_PROFILE = gql`
  query Query {
    getSellerProfile {
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
`;

export const KYC_SELLER_PROFILE = gql`
  mutation Mutation($firstName: String!, $lastName: String!, $phone: String!) {
    sellerProfile(firstName: $firstName, lastName: $lastName, phone: $phone) {
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
`;
export const KYC_STORE = gql`
  mutation Mutation(
    $gstIn: String!
    $storeName: String!
    $logo: Upload
    $businessCategory: String!
  ) {
    storeKyc(
      gstIn: $gstIn
      storeName: $storeName
      logo: $logo
      businessCategory: $businessCategory
    ) {
      gstIn
      id
    }
  }
`;

export const STORE_ADDRESS = gql`
  mutation SellerAddress(
    $addressLine1: String!
    $addressLine2: String!
    $landMark: String!
    $state: String!
    $city: String!
    $pinCode: String!
    $country: String!
  ) {
    sellerAddress(
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      landMark: $landMark
      state: $state
      city: $city
      pinCode: $pinCode
      country: $country
    ) {
      id
    }
  }
`;
export const BANK_ACCOUNT = gql`
  mutation SellerBankAccount(
    $accountNumber: String!
    $ifscCode: String!
    $bankName: String!
  ) {
    sellerBankAccount(
      accountNumber: $accountNumber
      ifscCode: $ifscCode
      bankName: $bankName
    ) {
      id
    }
  }
`;

export const BUSINESS_CATEGORY = gql`
  query GetBusinessCategory {
    getBusinessCategory {
      title
      id
    }
  }
`;
