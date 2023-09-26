import {
  ADD_CATEGORY,
  CATEGORY,
  CATEGORY_SELECT,
} from "@/grapqhl/queries/category";
import { useMutation, useQuery } from "@apollo/client";

export const addSellerCategory = () =>
  useMutation(ADD_CATEGORY, {
    update(cache, { data: { addSellerCategory } }) {
      const { getSellerCategory }: any = cache.readQuery({
        query: CATEGORY,
      });
      try {
        if (getSellerCategory) {
          const data = [addSellerCategory, ...getSellerCategory];
          cache.writeQuery({
            query: CATEGORY,
            data: { getSellerCategory: [...data] },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

export const getSellerCategory = () => useQuery(CATEGORY);

export const getCategorySelect = () => useQuery(CATEGORY_SELECT);
