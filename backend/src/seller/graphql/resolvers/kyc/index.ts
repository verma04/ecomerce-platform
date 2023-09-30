import db from "../../../../db/db";
import {
  seller,
  sellerProfile,
  sellerAddress,
  sellerBankAccount,
} from "../../../../ts-types";

import slugify from "slugify";
import checkGstNumber from "../../../../utils/checkGstNumber";
import { Prisma } from "@prisma/client";
import { UserInputError } from "apollo-server-express";

import checkAuth from "../../../../utils/checkAuth";
import uploadImage from "../../../../utils/upload/uploadImage";

const kycResolvers = {
  Query: {
    async getBusinessCategory(_: any, {}, context: any) {
      try {
        const data = await checkAuth(context);
        const category = await db.businessCategory.findMany({
          where: {
            isActive: true,
          },
        });

        return category;
      } catch (error) {
        throw error;
      }
    },
    async getSellerProfile(_: any, {}, context: any) {
      try {
        const data = await checkAuth(context);

        const updated = await db.sellerProfile.findUnique({
          where: {
            sellerId: data.id,
          },
          include: {
            category: true,
            logo: true,
            qrCode: true,
            seller: true,
          },
        });

        return updated;
      } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === "P2002") {
            return new UserInputError(`Try new ${error?.meta?.target}`);
          }
        }
      }
    },
  },
  Mutation: {
    async sellerProfile(
      _: any,
      { firstName, lastName, phone }: sellerProfile,
      context: any
    ) {
      try {
        const data = await checkAuth(context);

        const profile = await db.sellerProfile.update({
          where: {
            sellerId: data.id,
          },
          data: {
            firstName,
            lastName,
            phone,
          },
        });
        const updated = await db.sellerProfile.findUnique({
          where: {
            id: profile.id,
          },
          include: {
            category: true,
            logo: true,
            qrCode: true,
            seller: true,
          },
        });

        console.log(updated);

        return updated;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async storeKyc(
      _: any,
      { gstIn, storeName, logo, businessCategory }: any,
      context: any
    ) {
      try {
        const data = await checkAuth(context);
        const check = await checkGstNumber(gstIn);

        // if (check) {
        //   return new UserInputError(`Invalid GST Number`);
        // }
        const image = await uploadImage(logo);

        const slug = await slugify(storeName, {
          replacement: "-",
          remove: undefined,
          lower: false,
          strict: false,
          locale: "vi",
          trim: true,
        });

        const gstin = await db.sellerProfile.update({
          where: {
            sellerId: data.id,
          },
          data: {
            gstIn,
            storeName,
            slug,
            businessCategory: {
              connect: {
                id: businessCategory,
              },
            },
            logo: {
              create: {
                url: image,
                description: `${storeName} logo`,
                caption: `${storeName} logo`,
                alt: `${storeName} logo`,
                sellerId: data.id,
              },
            },
          },
        });

        return gstin;
      } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === "P2002") {
            return new UserInputError(`Try new ${error?.meta?.target}`);
          }
        }
      }
    },

    async sellerAddress(
      _: any,
      {
        addressLine1,
        addressLine2,
        landMark,
        state,
        city,
        pinCode,
        country,
      }: sellerAddress,
      context: any
    ) {
      try {
        const data = await checkAuth(context);

        const sellerProfile = await db.sellerProfile.findUnique({
          where: {
            sellerId: data.id,
          },
        });

        const updateAddress = await db.sellerAddress.update({
          where: {
            sellerProfileId: sellerProfile?.id,
          },
          data: {
            addressLine1,
            addressLine2,
            landMark,
            state,
            city,
            pinCode,
            country,
          },
        });
        console.log(updateAddress);

        return updateAddress;
        // return address;

        // const address = await db.sellerKyc.update({
        //   where: {
        //     userId: data.id,
        //   },
        //   data: {
        //     address: {
        //       create: {
        //         addressLine1,
        //         addressLine2,
        //         landMark,
        //         state,
        //         city,
        //         pinCode,
        //       },
        //     },
        //   },
        // });

        // const up = await db.sellerKyc.findUnique({
        //   where: {
        //     id: address.id,
        //   },
        //   include: {
        //     address: true,
        //   },
        // });
        // console.log(up);

        // return up?.address;
      } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === "P2002") {
            return new UserInputError(`Try new ${error?.meta?.target}`);
          }
        }
      }
    },

    async sellerBankAccount(
      _: any,
      { accountNumber, ifscCode, bankName }: sellerBankAccount,
      context: any
    ) {
      try {
        const data = await checkAuth(context);

        const address = await db.sellerProfile.update({
          where: {
            sellerId: data.id,
          },
          data: {
            account: {
              create: {
                accountNumber,
                ifscCode,
                bankName,
                isPrimary: true,
              },
            },
          },
        });

        const kycComplted = await db.seller.update({
          where: {
            id: data.id,
          },

          data: {
            isSellerKycCompleted: true,
          },
        });
        console.log(address);
        return address;

        // const address = await db.sellerKyc.update({
        //   where: {
        //     userId: data.id,
        //   },
        //   data: {
        //     address: {
        //       create: {
        //         addressLine1,
        //         addressLine2,
        //         landMark,
        //         state,
        //         city,
        //         pinCode,
        //       },
        //     },
        //   },
        // });

        // const up = await db.sellerKyc.findUnique({
        //   where: {
        //     id: address.id,
        //   },
        //   include: {
        //     address: true,
        //   },
        // });
        // console.log(up);

        // return up?.address;
      } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === "P2002") {
            return new UserInputError(`Try new ${error?.meta?.target}`);
          }
        }
      }
    },
  },
};

export { kycResolvers };
