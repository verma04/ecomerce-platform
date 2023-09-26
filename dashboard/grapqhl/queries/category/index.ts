import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation Mutation(
    $category: String!
    $subCategory: String!
    $description: String
  ) {
    addSellerCategory(
      category: $category
      subCategory: $subCategory
      description: $description
    ) {
      description
      id
      sort
      status
      title
      categoryImage {
        alt
        caption
        description
        id
        url
      }
    }
  }
`;

export const CATEGORY = gql`
  query SubCategory {
    getSellerCategory {
      subCategory {
        title
        id
      }
      product {
        id
      }
      sort
      id
      description
      categoryImage {
        alt
        caption
        description
        id
        url
      }
      category {
        id
        title
      }
      status
    }
  }
`;
export const CATEGORY_SELECT = gql`
  query GetCategorySelect {
    getCategorySelect {
      id
      title
      subCategory {
        id
        title
      }
    }
  }
`;
