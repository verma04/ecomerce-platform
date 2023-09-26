import checkAuth from "../../../../utils/checkAuth";
import db from "../../../../db/db";
import { sellerCategory, sellerWareHouse } from "../../../../ts-types";
import { UserInputError } from "apollo-server-express";
const warehouseResolvers = {
  Query: {
    async getAllWareHouse(_: any, {}, context: any) {
      try {
        const data = await checkAuth(context);
        const wareHouse = await db.wareHouse.findMany({
          orderBy: {
            createdAt: "asc",
          },

          where: {
            sellerId: data.id,
          },
        });

        return wareHouse;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async getAllActiveWareHouse(_: any, {}, context: any) {
      try {
        const data = await checkAuth(context);
        const wareHouse = await db.wareHouse.findMany({
          where: {
            isActive: true,
            sellerId: data.id,
          },
        });

        return wareHouse;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async getSellerWareHouseById(
      _: any,
      { id }: sellerWareHouse,
      context: any
    ) {
      try {
        const wareHouse = await db.wareHouse.findUnique({
          where: {
            id: id,
          },
        });
        return wareHouse;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    async addSellerWarehouse(
      _: any,
      {
        wareHouseName,
        contactPerson,
        mobileNumber,
        addressLine1,
        addressLine2,
        pinCode,
        city,
        state,
        gstIn,
      }: sellerWareHouse,
      context: any
    ) {
      try {
        const data = await checkAuth(context);

        const find = await db.wareHouse.findMany({
          where: {
            sellerId: data.id,
          },
        });

        const findName = await db.wareHouse.findFirst({
          where: {
            wareHouseName: wareHouseName,
            sellerId: data.id,
          },
        });

        if (findName) {
          return new UserInputError("WareHouse Exist try new name");
        }

        const warehouse = await db.wareHouse.create({
          data: {
            sellerId: data.id,
            wareHouseName,
            contactPerson,
            mobileNumber,
            addressLine1,
            addressLine2,
            pinCode,
            city,
            state,
            gstIn,
            isPrimary: find.length === 0 ? true : false,
          },
        });
        return warehouse;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async editSellerWarehouse(
      _: any,
      {
        id,
        wareHouseName,
        contactPerson,
        mobileNumber,
        addressLine1,
        addressLine2,
        pinCode,
        city,
        state,
        gstIn,
      }: sellerWareHouse,
      context: any
    ) {
      try {
        const data = await checkAuth(context);

        const update = await db.wareHouse.update({
          where: {
            id: id,
          },
          data: {
            wareHouseName,
            contactPerson,
            mobileNumber,
            addressLine1,
            addressLine2,
            pinCode,
            city,
            state,
            gstIn,
          },
        });
        return update;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async changePrimaryWarehouse(
      _: any,
      { id }: sellerWareHouse,
      context: any
    ) {
      try {
        const data = await checkAuth(context);

        const updateAll = await db.wareHouse.updateMany({
          where: {
            sellerId: {
              contains: data.id,
            },
          },
          data: {
            isPrimary: false,
          },
        });
        const update = await db.wareHouse.update({
          where: {
            id: id,
          },
          data: {
            isPrimary: true,
          },
        });

        const all = await db.wareHouse.findMany({
          orderBy: {
            createdAt: "asc",
          },
          where: {
            sellerId: data.id,
          },
        });
        return all;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async disablePrimaryWarehouse(
      _: any,
      { id }: sellerWareHouse,
      context: any
    ) {
      try {
        const data = await checkAuth(context);

        const update = await db.wareHouse.update({
          where: {
            id: id,
          },
          data: {
            isActive: false,
          },
        });
        return update;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

export { warehouseResolvers };
