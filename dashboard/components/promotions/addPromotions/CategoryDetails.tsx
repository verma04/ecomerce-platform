import RichEditor from "@/comman/HtmlEditor";
import ImageUploadLabel from "@/comman/ImagePop/ImageUplaodLabel";
import FormLayout from "@/components/comman/Form/FormLayout";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import {
  addSellerCategory,
  getCategorySelect,
} from "@/grapqhl/actions/category";
import { Category } from "@/types/type";
import { Box, InputLabel, TextField, Typography } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const CategoryDetails = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Category>();

  const [img, setImage] = React.useState("");

  const { data } = getCategorySelect();

  return (
    <Box width="100%">
      <form style={{ width: "100%" }}>
        <Box marginTop={"2rem"} width={"100%"}>
          <InputLabel>Description</InputLabel>
          <RichEditor />
        </Box>
      </form>
    </Box>
  );
};

export default CategoryDetails;
