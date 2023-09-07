import { ADD_IMAGE, GET_ALL_ASSEST } from "@/grapqhl/queries/assest";
import { useMutation, useQuery } from "@apollo/client";

export const getAllImages = () => useQuery(GET_ALL_ASSEST);

export const addImage = () => useMutation(ADD_IMAGE, {});
