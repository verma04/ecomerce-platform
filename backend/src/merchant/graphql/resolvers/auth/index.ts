import generateJwtToken from "../../../../utils/generateJwtToken";
import db from "../../../../db/db";
import bcrypt from "bcryptjs";
import { decryptToken, encryptToken } from "../../../../utils/crypto";
import { seller } from "../../../../ts-types";
import { randomBytes } from "crypto";
import slugify from "slugify";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { UserInputError } from "apollo-server-express";
import VerifyEmail from "../../../../email/seller/VerifyEmail";
const authResolvers = {
  Query: {
    async getUser(_: any, {}, context: any) {
      const salt = await bcrypt.genSalt(10);

      const user = await db.subCategory.create({
        data: {
          title: "Men Shirt",
          category: {
            connect: { id: "cllman4c10000utfhuoepbs2i" },
          },
        },
      });
    },
    async checkEmailToken(_: any, { token }: seller, context: any) {
      try {
        console.log(token);

        const check = await db.seller.findUnique({
          where: {
            emailToken: token,
          },
        });

        if (!check) {
          return new UserInputError(`Token not found`);
        }

        if (check.isMailVerified) {
          return new UserInputError(`Email Already Verified`);
        }

        return {
          status: true,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async sellerRegistration(
      _: any,
      { email, name, password }: seller,
      context: any
    ) {
      try {
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        const emailToken = randomBytes(64).toString("hex");

        const data = {
          email,
          name,
          password: hashPassword,
          emailToken,
        };

        const user = await db.seller.create({
          data,
        });

        const token = await generateJwtToken(user);
        const encrypt = await encryptToken(token);

        VerifyEmail({
          name: user.name,
          email: user.email,
          url: `${process.env.FRONTEND_URL}/verify-email/${user.emailToken}`,
        });

        return {
          token: encrypt,
        };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === "P2002") {
            return new UserInputError(`Try new ${error?.meta?.target}`);
          }
        }
      }
    },

    async verifyEmail(_: any, { token }: seller, context: any) {
      try {
        try {
          console.log(token);

          const check = await db.seller.findUnique({
            where: {
              emailToken: token,
            },
          });

          if (!check) {
            return new UserInputError(`Token not found`);
          }
          if (check.isMailVerified) {
            return new UserInputError(`Email Already Verified`);
          }
          await db.seller.update({
            where: {
              emailToken: token,
            },
            data: {
              isMailVerified: true,
            },
          });
          return {
            status: true,
          };
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
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

export { authResolvers };
