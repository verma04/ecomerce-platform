import { ADD_IMAGE, GET_ALL_ASSEST } from "@/grapqhl/queries/assest";
import { useMutation, useQuery } from "@apollo/client";

export const getAllImages = () => useQuery(GET_ALL_ASSEST);

export const addImage = () =>
  useMutation(ADD_IMAGE, {
    update(cache, { data: { addImage } }) {
      const { getAllImages }: any = cache.readQuery({
        query: GET_ALL_ASSEST,
      });

      try {
        if (getAllImages) {
          const data = [addImage, ...getAllImages];
          cache.writeQuery({
            query: ADD_IMAGE,
            data: { getAllImages: [...data] },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
