import checkAuth from "../../../../utils/checkAuth";
import db from "../../../../db/db";
import { customerType } from "../../../../ts-types";
import { UserInputError } from "apollo-server-express";
const customerResolvers = {
  Query: {
    async getAllCustomer(_: any, {}, context: any) {
      try {
        const data = await checkAuth(context);
        const customer = await db.customer.findMany({
          where: {
            sellerId: data.id,
          },
          include: {
            address: true,
          },
        });
        console.log(customer);
        return customer;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    async addCustomer(
      _: any,
      { firstName, lastName, email, phone, address }: customerType,
      context: any
    ) {
      try {
        const addressC = JSON.parse(address);
        const data = await checkAuth(context);
        const find = await db.customer.findFirst({
          where: {
            email,
            sellerId: data?.id,
          },
        });
        console.log(find);

        if (find) {
          return new UserInputError("Customer exist try New Email name");
        }
        const addCategory = await db.customer.create({
          data: {
            firstName,
            lastName,
            phone,
            email,
            address: {
              create: addressC,
            },

            seller: {
              connect: {
                id: data.id,
              },
            },
          },
        });

        const user = await db.customer.findUnique({
          where: {
            id: addCategory.id,
          },
          include: {
            address: true,
          },
        });

        console.log(user);

        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

export { customerResolvers };
