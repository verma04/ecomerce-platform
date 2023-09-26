import generateJwtToken from "../../../../utils/generateJwtToken";
import db from "../../../../db/db";
import bcrypt from "bcryptjs";
import { encryptToken } from "../../../../utils/crypto";
import { seller, sellerProfile, sellerAddress } from "../../../../ts-types";
import { randomBytes } from "crypto";
import slugify from "slugify";
import checkGstNumber from "../../../../utils/checkGstNumber";
import { Prisma } from "@prisma/client";
import { UserInputError } from "apollo-server-express";
import VerifyEmail from "../../../../email/seller/VerifyEmail";
import generateQrCode from "../../../../utils/generateQrCode";
import checkAuth from "../../../../utils/checkAuth";
import { isTemporaryEmail } from "../../../../utils/checkMail";

const authResolvers = {
  Query: {
    async getUser(_: any, {}, context: any) {
      const data = await checkAuth(context);

      const get = await db.seller.findUnique({
        where: {
          id: data.id,
        },
        include: {
          sellerProfile: {
            include: {
              logo: true,
            },
          },
        },
      });

      return {
        sellerProfile: get?.sellerProfile,
        kyc: get?.isSellerKycCompleted,
        email: get?.email,
      };
    },
    async getCategory(_: any, {}, context: any) {
      await checkAuth(context);
      const category = await db.category.findMany({});
      return category;
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
      { email, firstName, lastName, password }: seller,
      context: any
    ) {
      try {
        const checkMail = await isTemporaryEmail(email);

        if (checkMail) {
          return new UserInputError(`Please don't use spam email address`);
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        const emailToken = randomBytes(64).toString("hex");

        const data = {
          email,

          password: hashPassword,
          emailToken,
          sellerProfile: {
            create: {
              firstName,
              lastName,
              address: {
                create: {},
              },
            },
          },
          kyc: {
            create: {},
          },
        };

        const user = await db.seller.create({
          data,
        });

        const token = await generateJwtToken(user);
        const encrypt = await encryptToken(token);

        VerifyEmail({
          name: `${firstName} ${lastName}`,
          email: user.email,
          url: `${process.env.FRONTEND_URL}/verify-email/${user.emailToken}`,
        });

        return {
          token: encrypt,
        };
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

    async sellerGoogleRegistration(
      _: any,
      { email, firstName, lastName, id }: seller,
      context: any
    ) {
      try {
        const user = await db.seller.create({
          data: {
            email,

            loginMethod: "google",
            uniqueGoogleId: id,
            sellerProfile: {
              create: {
                firstName,
                lastName,
                address: {
                  create: {},
                },
              },
            },
          },
        });

        const token = await generateJwtToken(user);
        const encrypt = await encryptToken(token);

        return {
          token: encrypt,
        };
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

    async sellerLogin(_: any, { email }: seller, context: any) {
      try {
        const check = await db.seller.findUnique({
          where: {
            email,
          },
        });

        if (!check) {
          return new UserInputError(`Email not found`);
        }

        if (!check.status) {
          return new UserInputError("Account Disabled Contact administrator");
        }
        if (check.loginMethod === "google") {
          return new UserInputError(
            `Your register with Google please login with google`
          );
        }

        return {
          status: true,
          email,
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

    async sellerLoginWithPassword(
      _: any,
      { email, password }: seller,
      context: any
    ) {
      try {
        const check = await db.seller.findUnique({
          where: {
            email,
          },
        });
        if (!check) {
          return new UserInputError(`Email not found`);
        }

        if (!check.status) {
          return new UserInputError("Account Disabled Contact administrator");
        }

        const match = await bcrypt.compare(
          password,
          check?.password ? check?.password : "check?.password "
        );
        if (!match) {
          return new UserInputError("Wrong credentials");
        }

        const token = await generateJwtToken(check);
        const encrypt = await encryptToken(token);
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

    async sellerGoogleLogin(_: any, { email, id }: seller, context: any) {
      try {
        const check = await db.seller.findUnique({
          where: {
            email,
          },
        });
        console.log(check, email, id);
        if (!check) {
          return new UserInputError(`Email not found`);
        }

        if (!check.status) {
          return new UserInputError("Account Disabled Contact administrator");
        }

        const token = await generateJwtToken(check);
        const encrypt = await encryptToken(token);
        if (check?.loginMethod === "email") {
          return {
            token: encrypt,
            loginType: "email",
          };
        } else {
          return {
            token: encrypt,
          };
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
