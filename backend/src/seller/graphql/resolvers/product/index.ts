import checkAuth from "../../../../utils/checkAuth";
import db from "../../../../db/db";
import { sellerProduct } from "../../../../ts-types";
import { UserInputError } from "apollo-server-express";
const productResolvers = {
  Query: {
    async getSellerProduct(_: any, {}, context: any) {
      await checkAuth(context);
      const category = await db.product.findMany({});
      return category;
    },
  },
  Mutation: {
    async addSellerProduct(
      _: any,
      { productName, brandName, productCategory, productImage }: sellerProduct,
      context: any
    ) {
      try {
        const data = await checkAuth(context);
        const find = await db.product.findFirst({
          where: {
            sellerId: data.id,
            productName,
          },
        });

        console.log(find);

        if (find) {
          return new UserInputError("Name exist try New Product name");
        }
        const addProduct = await db.product.create({
          data: {
            brandName,
            productName,
            productImage: {
              connect: {
                id: productImage,
              },
            },

            productCategory: {
              connect: {
                id: productCategory,
              },
            },
            seller: {
              connect: {
                id: data.id,
              },
            },

            productDetails: {
              create: {
                legalDisclaimer: productName,
              },
            },
            productColor: {
              create: {
                title: "size",
              },
            },
            productSize: {
              create: {
                title: "size",
              },
            },
          },
        });

        const product = await db.product.findUnique({
          where: {
            id: addProduct.id,
          },
          include: {
            productDetails: true,
          },
        });

        return product;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async editProductColor(
      _: any,
      { productId, sizes, title }: any,
      context: any
    ) {
      try {
        const color = [
          {
            title: "red",
          },
          {
            title: "blue",
          },
          {
            title: "green",
          },
          {
            title: "yellow",
          },
        ];
        const set = await db.productColor.findUnique({
          where: {
            productId,
          },
        });

        console.log(set);
        const updateColor = await db.productColor.update({
          where: {
            productId,
          },
          data: {
            title,
            array: {
              createMany: {
                data: color,
              },
            },
          },
        });
        const colors = await db.productColor.findUnique({
          where: { id: updateColor.id },
          include: {
            array: true,
          },
        });

        console.log(colors);
        return colors;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async editProductSize(
      _: any,
      { productId, sizes, title }: any,
      context: any
    ) {
      try {
        const color = [
          {
            title: "S",
          },
          {
            title: "M",
          },
          {
            title: "L",
          },
          {
            title: "XL",
          },
        ];
        const set = await db.productSize.findUnique({
          where: {
            productId,
          },
        });
        const updateColor = await db.productSize.update({
          where: {
            productId,
          },
          data: {
            title,
            array: {
              createMany: {
                data: color,
              },
            },
          },
        });
        const colors = await db.productSize.findUnique({
          where: { id: updateColor.id },
          include: {
            array: true,
          },
        });
        console.log(colors);
        return colors;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async createVariants(_: any, { productId }: any, context: any) {
      try {
        const find = await db.product.findUnique({
          where: {
            id: productId,
          },
          include: {
            productColor: {
              include: {
                array: true,
              },
            },
            productVariant: true,
            productSize: {
              include: {
                array: true,
              },
            },
          },
        });

        if (find?.productVariant) {
          return new UserInputError("Variant Already Created");
        }

        if (find?.productSize?.array?.length === 0) {
          return new UserInputError(
            "Add Product Sizes to create Product Variant"
          );
        }
        if (find?.productColor?.array.length === 0) {
          return new UserInputError(
            "Add Product Color to create Product Variant"
          );
        }

        const size = find?.productSize?.array;
        const colors = find?.productColor?.array;

        const variant: any = [];

        //@ts-ignore
        for (let i = 0; i < size.length; i++) {
          //@ts-ignore
          for (let j = 0; j < colors.length; j++) {
            //@ts-ignore
            const data = {
              stock: 0,
              mrp: 0,
              price: 0,
              sku: 123,
              //@ts-ignore
              sizeId: size[i].id,
              //@ts-ignore
              allColorId: colors[j].id,
              //   //@ts-ignore
              //   size: size[i].title,
              //   //@ts-ignore
              //   color: colors[j].title,
            };
            variant.push(data);
          }
        }

        const variants = await db.product.update({
          where: {
            id: productId,
          },
          data: {
            productVariant: {
              createMany: {
                data: variant,
              },
            },
          },
        });

        const up = await db.product.findUnique({
          where: {
            id: productId,
          },
          include: {
            productVariant: {
              include: {
                size: true,
                color: true,
              },
            },
          },
        });

        return up;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

export { productResolvers };
