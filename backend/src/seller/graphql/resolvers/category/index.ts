import checkAuth from "../../../../utils/checkAuth";
import db from "../../../../db/db";
import { sellerCategory } from "../../../../ts-types";
import { UserInputError } from "apollo-server-express";
const categoryResolvers = {
  Query: {
    async getCategorySelect(_: any, {}, context: any) {
      try {
        const data = await checkAuth(context);
        const sellerProfile = await db.sellerProfile.findUnique({
          where: {
            sellerId: data.id,
          },
        });
        if (sellerProfile?.businessCategoryId) {
          const category = await db.businessCategory.findFirst({
            where: {
              id: sellerProfile?.businessCategoryId,
            },
            include: {
              category: {
                include: {
                  subCategory: true,
                },
              },
            },
          });
          console.log(category);
          return category?.category;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async getSellerCategory(_: any, {}, context: any) {
      try {
        const data = await checkAuth(context);
        const category = await db.sellerCategory.findMany({
          where: {
            sellerId: data.id,
          },
          include: {
            category: true,
            subCategory: true,
            product: true,
          },
        });
        console.log(category);
        return category;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    async addSellerCategory(
      _: any,
      { description, category, subCategory }: sellerCategory,
      context: any
    ) {
      try {
        const data = await checkAuth(context);
        const find = await db.sellerCategory.findFirst({
          where: {
            sellerId: data.id,
            categoryId: category,
            subCategoryId: subCategory,
          },
        });

        if (find) {
          return new UserInputError("Name exist try New category name");
        }
        const addCategory = await db.sellerCategory.create({
          data: {
            category: {
              connect: {
                id: category,
              },
            },
            subCategory: {
              connect: {
                id: subCategory,
              },
            },

            description,

            seller: {
              connect: {
                id: data.id,
              },
            },
          },
        });

        const add = await db.sellerCategory.findUnique({
          where: {
            id: addCategory.id,
          },
          include: {
            categoryImage: true,
            category: {
              include: {
                subCategory: true,
              },
            },
          },
        });

        console.log(add, "sd");
        return add;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

export { categoryResolvers };
