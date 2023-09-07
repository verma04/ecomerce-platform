import checkAuth from "../../../../utils/checkAuth";
import db from "../../../../db/db";
import { sellerCategory } from "../../../../ts-types";
import { UserInputError } from "apollo-server-express";
const categoryResolvers = {
  Query: {
    async getSellerCategory(_: any, {}, context: any) {
      await checkAuth(context);
      const category = await db.category.findMany({});
      return category;
    },
  },
  Mutation: {
    async addSellerCategory(
      _: any,
      { title, description, categoryImage }: sellerCategory,
      context: any
    ) {
      try {
        console.log(title);
        const data = await checkAuth(context);
        const find = await db.sellerCategory.findFirst({
          where: {
            sellerId: data.id,
            title,
          },
        });

        console.log(find);

        if (find) {
          return new UserInputError("Name exist try New category name");
        }
        const addCategory = await db.sellerCategory.create({
          data: {
            title,
            description,
            categoryImage: {
              connect: {
                id: categoryImage,
              },
            },
            seller: {
              connect: {
                id: data.id,
              },
            },
          },
        });

        const category = await db.sellerCategory.findUnique({
          where: {
            id: addCategory.id,
          },
          include: {
            categoryImage: true,
          },
        });

        return category;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

export { categoryResolvers };
