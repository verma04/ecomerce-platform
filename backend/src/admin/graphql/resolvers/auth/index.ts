import db from "../../../../db/db";
import bcrypt from "bcryptjs";

const authResolvers = {
  Query: {
    async getUser(_: any, {}, context: any) {
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      const hashPassword = await bcrypt.hash("123456", salt);

      const user = await db.category.create({
        data: {
          title: "Fashion",
          user: {
            connect: { id: "cllmaeplc0000ut4i68radgad" },
          },
        },
      });
      console.log(user);
      return {
        name: "pankaj",
      };
    },
  },
  Mutation: {
    async addUser(_: any, {}, context: any) {
      return {
        name: "pankaj",
      };
    },
  },
};

export { authResolvers };
