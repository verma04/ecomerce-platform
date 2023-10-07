import checkAuth from "../../../../utils/checkAuth";
import db from "../../../../db/db";
import { sellerProduct } from "../../../../ts-types";
import { UserInputError } from "apollo-server-express";
const productResolvers = {
  Query: {
    async getSellerProduct(_: any, {}, context: any) {
      const data = await checkAuth(context);
      const product = await db.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          sellerId: data.id,
        },
        include: {
          img: true,
          productInformation: true,
          sellerCategory: {
            include: {
              category: true,
              subCategory: true,
            },
          },
          inventory: {
            include: {
              warehouse: true,
            },
          },
          productVariant: {
            include: {
              combination: true,
            },
          },
          variant: {
            include: {
              variantList: true,
            },
          },
        },
      });
      return product;
    },
  },
  Mutation: {
    async addSellerProduct(
      _: any,
      { productInformation, variant, inventory, variantGenerated, img }: any,
      context: any
    ) {
      try {
        const data = await checkAuth(context);

        const product = JSON.parse(productInformation);
        const inventoryData = JSON.parse(inventory);
        const variants = variant ? JSON.parse(variant) : null;
        const productVariant = variantGenerated
          ? JSON.parse(variantGenerated)
          : null;
        const imgs = JSON.parse(img);
        console.log(imgs);

        const addProduct = await db.product.create({
          data: {
            sellerCategoryId: product.category,
            sellerId: data.id,

            productInformation: {
              create: {
                productName: product.productName,
                price: product.price,
                discountedPrice: product.discountedPrice,
                unit: product.unit,

                productPerUnit: product.productPerUnit,
              },
            },
            inventory: {
              create: {
                quantity: inventoryData.quantity,
                sku: inventoryData.sku,

                wareHouseId: inventoryData.warehouse,
              },
            },
          },
        });

        const variantsC = variants.map((set: any) => ({
          name: set.name,
          type: set.type,
          variantList: set.list,
        }));

        await variantsC.forEach(async (element: any) => {
          const createVariant = await db.variant.create({
            data: {
              name: element.name,
              type: element.type,
              productId: addProduct.id,
            },
          });

          await element.variantList.forEach(async (el: any) => {
            const creatList = await db.variantList.create({
              data: {
                ...el,
                variantId: createVariant.id,
              },
            });
          });
        });

        const productVariantC = productVariant.map((set: any) => ({
          discountedPrice: set.discountedPrice,
          price: set.price,
          stock: set.stock,
          productId: addProduct.id,
          combination: set.variant,
        }));

        await productVariantC.forEach(async (element: any) => {
          const createProductVariant = await db.productVariant.create({
            data: {
              discountedPrice: element.discountedPrice,
              price: element.price,
              stock: element.stock,
              productId: addProduct.id,
            },
          });

          await element.combination.forEach(async (el: any) => {
            const creatList = await db.combination.create({
              data: {
                ...el,
                productVariantId: createProductVariant.id,
              },
            });
          });
        });
        if (imgs.length !== 0) {
          await imgs.forEach(async (el: any) => {
            const update = await db.image.update({
              where: {
                id: el.id,
              },
              data: {
                productId: addProduct?.id,
              },
            });
          });
        }
        const productDetails = await db.product.findUnique({
          where: {
            id: addProduct.id,
          },
          include: {
            img: true,
            sellerCategory: {
              include: {
                category: true,
                subCategory: true,
              },
            },
            productInformation: true,
            productVariant: {
              include: {
                combination: true,
              },
            },
            variant: {
              include: {
                variantList: true,
              },
            },
          },
        });

        return productDetails;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async changeProductStatus(_: any, { id, status }: any, context: any) {
      try {
        const update = await db.product.update({
          where: {
            id: id,
          },
          data: {
            isActive: status,
          },
        });
        const product = await db.product.findUnique({
          where: {
            id: update?.id,
          },
          include: {
            img: true,
            productInformation: true,
            sellerCategory: {
              include: {
                category: true,
                subCategory: true,
              },
            },
            inventory: {
              include: {
                warehouse: true,
              },
            },
            productVariant: {
              include: {
                combination: true,
              },
            },
            variant: {
              include: {
                variantList: true,
              },
            },
          },
        });
        return product;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

export { productResolvers };
