import { gql } from "@apollo/client";

const customer = `
  address {
      addressLine1
      addressLine2
      city
      country
      landMark
      pinCode
      state
    }
    email
    firstName
    id
    lastName
    phone
  
`;
export const ALL_CUSTOMER = gql`
  query GetAllCustomer {
    getAllCustomer {
    ${customer}
    }
  }
`;

export const ADD_CUSTOMER = gql`
mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $address: String!) {
  addCustomer(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, address: $address) {
         ${customer}
  }
}`;
