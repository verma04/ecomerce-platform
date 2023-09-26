import checkAuth from "../../../../utils/checkAuth";
import db from "../../../../db/db";
import { images } from "../../../../ts-types";
import uploadImage from "../../../../utils/upload/uploadImage";
const assetsResolvers = {
  Query: {
    async getAllImages(_: any, {}, context: any) {
      try {
        const data = await checkAuth(context);

        const category = await db.image.findMany({
          orderBy: {
            createdAt: "desc",
          },
          where: {
            sellerId: data.id,
          },
        });

        return category;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async addImage(
      _: any,
      { description, caption, alt, file }: images,
      context: any
    ) {
      try {
        const data = await checkAuth(context);
        const url = await uploadImage(file);
        console.log(data);
        const images = await db.image.create({
          data: {
            url: url,
            description,
            caption,
            alt,
            seller: {
              connect: {
                id: data.id,
              },
            },
          },
        });
        return images;
      } catch (error) {
        // console.log(error);
      }
    },
    async updateImage(
      _: any,
      { url, description, caption, alt, id }: images,
      context: any
    ) {
      await checkAuth(context);
      const images = await db.image.update({
        where: {
          id: id,
        },
        data: {
          url,
          description,
          caption,
          alt,
        },
      });
      return images;
    },
  },
};

export { assetsResolvers };
