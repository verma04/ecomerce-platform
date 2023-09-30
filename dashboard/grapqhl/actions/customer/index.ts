import { ADD_CUSTOMER, ALL_CUSTOMER } from "@/grapqhl/queries/customer";
import { useMutation, useQuery } from "@apollo/client";

export const addCustomer = () =>
  useMutation(ADD_CUSTOMER, {
    update(cache, { data: { addCustomer } }) {
      const { getAllCustomer }: any = cache.readQuery({
        query: ALL_CUSTOMER,
      });
      try {
        if (getAllCustomer) {
          const data = [addCustomer, ...getAllCustomer];
          cache.writeQuery({
            query: ALL_CUSTOMER,
            data: { getAllCustomer: [...data] },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

export const getAllCustomer = () => useQuery(ALL_CUSTOMER);
