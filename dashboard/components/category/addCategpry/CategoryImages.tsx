import RichEditor from "@/comman/HtmlEditor";
import ImageUploadLabel from "@/comman/ImagePop/ImageUplaodLabel";
import FormLayout from "@/components/comman/Form/FormLayout";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import { addSellerCategory } from "@/grapqhl/actions/category";
import { Category } from "@/types/type";
import { Box, InputLabel, TextField, Typography } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const CategoryImages = () => {
  const [add, { data, loading, error }] = addSellerCategory();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Category>();

  const [description, setDescription] = React.useState("");
  const [img, setImage] = React.useState("");
  if (error) {
    toast.error(
      <>
        <ErrorMessage error={error} />
      </>,
      {
        id: "error",
      }
    );
  }
  const onSubmit: SubmitHandler<Category> = (data) => {
    add({
      variables: { ...data, description },
    });
  };
  return (
    <Box width="100%">
      <Box marginTop={"2rem"} width={"100%"}>
        <ImageUploadLabel
          label="category Image"
          img={img}
          setImage={setImage}
        />
      </Box>
    </Box>
  );
};

export default CategoryImages;
