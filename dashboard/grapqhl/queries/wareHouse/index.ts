import { gql } from "@apollo/client";

const warehouse = `
 addressLine1
    addressLine2
    city
    contactPerson
    gstIn
    id
    mobileNumber
    pinCode
    state
    wareHouseName
     isPrimary
`;
export const ALL_WAREHOUSE = gql`
  query ExampleQuery {
    getAllWareHouse {
     ${warehouse}
    }
  }
`;

export const WAREHOUSE_BY_ID = gql`
  query GetSellerWareHouseById($id: ID) {
    getSellerWareHouseById(id: $id) {
           ${warehouse}
    }
  }
`;

export const ACTIVE_WAREHOUSE = gql`
query getAllActiveWareHouse {
  getAllActiveWareHouse {
        ${warehouse}
  }
}`;

export const CHANGE_PRIMARY_WAREHOUSE = gql`
mutation ChangePrimaryWarehouse($id: ID) {
  changePrimaryWarehouse(id: $id) {
    
     ${warehouse}
  }
}`;
export const ADD_WAREHOUSE = gql`
mutation AddSellerWarehouse($wareHouseName: String!, $contactPerson: String!, $mobileNumber: String!, $addressLine1: String!, $addressLine2: String!, $pinCode: String!, $city: String!, $state: String!, $gstIn: String!) {
  addSellerWarehouse(wareHouseName: $wareHouseName, contactPerson: $contactPerson, mobileNumber: $mobileNumber, addressLine1: $addressLine1, addressLine2: $addressLine2, pinCode: $pinCode, city: $city, state: $state, gstIn: $gstIn) {
      ${warehouse}
  }
}`;

export const EDIT_WAREHOUSE = gql`
mutation EditSellerWarehouse($id: ID!, $wareHouseName: String!, $contactPerson: String!, $mobileNumber: String!, $addressLine1: String!, $addressLine2: String!, $pinCode: String!, $city: String!, $state: String!, $gstIn: String!) {
  editSellerWarehouse(id: $id, wareHouseName: $wareHouseName, contactPerson: $contactPerson, mobileNumber: $mobileNumber, addressLine1: $addressLine1, addressLine2: $addressLine2, pinCode: $pinCode, city: $city, state: $state, gstIn: $gstIn) {
          ${warehouse}
  }
}`;

export const DISABLE_WAREHOUSE = gql`
mutation DisablePrimaryWarehouse($id: ID) {
  disablePrimaryWarehouse(id: $id) {
             ${warehouse}
  }
}`;
