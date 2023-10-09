import { ADD_IMAGE, GET_ALL_ASSEST } from "@/grapqhl/queries/assest";
import { useMutation, useQuery } from "@apollo/client";

export const getAllImages = () => useQuery(GET_ALL_ASSEST);

export const addImage = () =>
  useMutation(ADD_IMAGE, {
    update(cache, { data: { addImage } }) {
      const { getAllImages }: any = cache.readQuery({
        query: GET_ALL_ASSEST,
      });
      console.log(getAllImages);

      try {
        if (getAllImages) {
          const data = [addImage, ...getAllImages];
          console.log(data);
          cache.writeQuery({
            query: GET_ALL_ASSEST,
            data: { getAllImages: [...data] },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
