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
const authResolvers = {
  Query: {
    async getUser(_: any, {}, context: any) {
      const salt = await bcrypt.genSalt(10);

      const user = await db.subCategory.create({
        data: {
          title: "Men Shirt",
        },
      });
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
      { email, name, password }: seller,
      context: any
    ) {
      try {
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        const emailToken = randomBytes(64).toString("hex");

        const kyc = {};
        const data = {
          email,
          name,
          password: hashPassword,
          emailToken,
        };

        const user = await db.seller.create({
          data,
        });

        const sellerKyc = await db.sellerKyc.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
          },
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
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === "P2002") {
            return new UserInputError(`Try new ${error?.meta?.target}`);
          }
        }
      }
    },

    async sellerLogin(_: any, { email, password }: seller, context: any) {
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

    async sellerProfile(
      _: any,
      { name, category, sellerLogo }: sellerProfile,
      context: any
    ) {
      try {
        const data = await checkAuth(context);
        const slug = slugify(name, {
          replacement: "-",
          remove: undefined,
          lower: false,
          strict: false,
          locale: "vi",
          trim: true,
        });
        //generate qr code
        const code = await generateQrCode(sellerLogo);

        const qr = await db.qrCode.create({
          data: {
            qrcode: code ? code : "",
          },
        });

        const profile = await db.sellerProfile.create({
          data: {
            name,
            slug,
            qrCode: {
              connect: {
                id: qr.id,
              },
            },
            seller: {
              connect: {
                id: data.id,
              },
            },
            category: {
              connect: {
                id: category,
              },
            },
            logo: {
              connect: {
                id: sellerLogo,
              },
            },
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === "P2002") {
            return new UserInputError(`Try new ${error?.meta?.target}`);
          }
        }
      }
    },

    async sellerKyc(_: any, { gstIn }: any, context: any) {
      try {
        const data = await checkAuth(context);
        const check = await checkGstNumber(gstIn);
        console.log(check);

        // if (check) {
        //   return new UserInputError(`Invalid GST Number`);
        // }
        const gstin = await db.sellerKyc.update({
          where: {
            userId: data.id,
          },
          data: {
            gstIn,
            user: {
              connect: {
                id: data.id,
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
      }: sellerAddress,
      context: any
    ) {
      try {
        const data = await checkAuth(context);

        const address = await db.sellerKyc.update({
          where: {
            userId: data.id,
          },
          data: {
            address: {
              create: {
                addressLine1,
                addressLine2,
                landMark,
                state,
                city,
                pinCode,
              },
            },
          },
        });

        const up = await db.sellerKyc.findUnique({
          where: {
            id: address.id,
          },
          include: {
            address: true,
          },
        });
        console.log(up);

        return up?.address;
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

export { authResolvers };
