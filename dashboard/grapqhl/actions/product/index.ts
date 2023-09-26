import {
  ADD_PRODUCT,
  GET_ALL_PRODUCT,
  PRODUCT_STATUS,
} from "@/grapqhl/queries/product";
import { useMutation, useQuery } from "@apollo/client";

export const addSellerProduct = () =>
  useMutation(ADD_PRODUCT, {
    update(cache, { data: { addSellerProduct } }) {
      const { getSellerProduct }: any = cache.readQuery({
        query: GET_ALL_PRODUCT,
      });

      console.log(addSellerProduct, getSellerProduct);
      try {
        if (getSellerProduct) {
          const data = [...getSellerProduct, addSellerProduct];
          cache.writeQuery({
            query: ADD_PRODUCT,
            data: { getSellerProduct: [...data] },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

export const changeProductStatus = () =>
  useMutation(PRODUCT_STATUS, {
    update(cache, { data: { changeProductStatus } }) {
      const { getSellerProduct }: any = cache.readQuery({
        query: GET_ALL_PRODUCT,
      });

      try {
        if (getSellerProduct) {
          const data = [...getSellerProduct, changeProductStatus];
          cache.writeQuery({
            query: ADD_PRODUCT,
            data: { getSellerProduct: [...data] },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

export const getSellerProduct = () => useQuery(GET_ALL_PRODUCT, {});
