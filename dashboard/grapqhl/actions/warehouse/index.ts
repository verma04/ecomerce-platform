import {
  ACTIVE_WAREHOUSE,
  ADD_WAREHOUSE,
  ALL_WAREHOUSE,
  CHANGE_PRIMARY_WAREHOUSE,
  DISABLE_WAREHOUSE,
  EDIT_WAREHOUSE,
  WAREHOUSE_BY_ID,
} from "@/grapqhl/queries/wareHouse";
import { useMutation, useQuery } from "@apollo/client";

export const getAllWareHouse = () => useQuery(ALL_WAREHOUSE);

export const getSellerWareHouseById = () => useQuery(WAREHOUSE_BY_ID);

export const getAllActiveWareHouse = () => useQuery(ACTIVE_WAREHOUSE);

export const changePrimaryWarehouse = () =>
  useMutation(CHANGE_PRIMARY_WAREHOUSE, {
    update(cache, { data: { changePrimaryWarehouse } }) {
      try {
        const { getAllWareHouse }: any = cache.readQuery({
          query: ALL_WAREHOUSE,
        });
        const arr = getAllWareHouse;

        if (getAllWareHouse) {
          cache.writeQuery({
            query: ALL_WAREHOUSE,
            data: { getAllWareHouse: changePrimaryWarehouse },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

export const addSellerWarehouse = () =>
  useMutation(ADD_WAREHOUSE, {
    update(cache, { data: { addSellerWarehouse } }) {
      const { getAllWareHouse }: any = cache.readQuery({
        query: ALL_WAREHOUSE,
      });
      try {
        if (getAllWareHouse) {
          const data = [addSellerWarehouse, ...getAllWareHouse];
          cache.writeQuery({
            query: ALL_WAREHOUSE,
            data: { getAllWareHouse: [...data] },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

export const editSellerWarehouse = () =>
  useMutation(EDIT_WAREHOUSE, {
    update(cache, { data: { editSellerWarehouse } }) {
      try {
        const { getAllWareHouse }: any = cache.readQuery({
          query: ALL_WAREHOUSE,
        });
        const arr = getAllWareHouse;

        // console.log(getAllWareHouse, editSellerWarehouse, "sdds");
        const objIndex = getAllWareHouse.findIndex(
          (set: any) => set.id === editSellerWarehouse.id
        );

        arr[objIndex] = editSellerWarehouse;

        cache.writeQuery({
          query: ALL_WAREHOUSE,
          data: { getAllWareHouse: [...arr] },
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

export const disablePrimaryWarehouse = () =>
  useMutation(DISABLE_WAREHOUSE, {
    update(cache, { data: { disablePrimaryWarehouse } }) {
      try {
        const { getAllWareHouse }: any = cache.readQuery({
          query: ALL_WAREHOUSE,
        });
        const arr = getAllWareHouse;

        // console.log(getAllWareHouse, disablePrimaryWarehouse, "sdds");
        const objIndex = getAllWareHouse.findIndex(
          (set: any) => set.id === disablePrimaryWarehouse.id
        );

        arr[objIndex] = disablePrimaryWarehouse;

        cache.writeQuery({
          query: ALL_WAREHOUSE,
          data: { getAllWareHouse: [...arr] },
        });
      } catch (err) {
        console.log(err);
      }
    },
  });
