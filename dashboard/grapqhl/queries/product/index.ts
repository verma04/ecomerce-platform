import { gql } from "@apollo/client";

const product = `
  isActive
  id
    inventory {
        id
        quantity
        sku
        warehouse {
          wareHouseName
        }
      }
      productInformation {
        discountedPrice
        id
        price
        productName
        productPerUnit
        unit
      }
      productVariant {
        combination {
          id
          name
          value
        }
        discountedPrice
        id
        price
        stock
      }
      sellerCategory {
        title
        category {
          title
        }
      }
      variant {
        name
        type
        variantList {
          id
          value
        }
      }
       img {
      alt
      caption
      description
      id
      url
    }
    
`;

export const ADD_PRODUCT = gql`
  mutation Mutation($productInformation: String!, $variant: String!, $inventory: String!, $variantGenerated: String!, $img: String!) {
  addSellerProduct(productInformation: $productInformation, variant: $variant, inventory: $inventory, variantGenerated: $variantGenerated, img: $img) {
      ${product}
    }
  }
`;

export const GET_ALL_PRODUCT = gql`
  query getSellerProduct {
    getSellerProduct {
      ${product}
  }
  }
`;

export const PRODUCT_STATUS = gql`
mutation Mutation($id: String!, $status: Boolean!) {
  changeProductStatus(id: $id, status: $status) {
       ${product}
  }
}`;
