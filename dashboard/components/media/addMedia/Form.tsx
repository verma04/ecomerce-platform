import { addImage } from "@/grapqhl/actions/assets";
import ImageUploadLabel from "../../../comman/ImagePop/ImageUplaodLabel";

import { imageInput } from "@/types/type";
import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogActions, TextField } from "@mui/material";
import { randomUUID } from "crypto";
import React, { useEffect, useId } from "react";

import { SubmitHandler, set, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const FormMedia = ({ image, handleClose }) => {
  const id = useId();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<imageInput>();

  const [mutate, { data, loading, error }] = addImage();

  const onSubmit: SubmitHandler<imageInput> = (data) => {
    const set = {
      ...data,
      file: image,
    };

    mutate({
      variables: set,
    });

    // mutate(set);
  };

  React.useEffect(() => {
    handleClose();
  }, [data]);

  return (
    <form
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={"column"}
        width={"90%"}
        height={"90%"}
      >
        <TextField
          {...register("alt", {
            required: "required",
          })}
          error={errors.alt && true}
          fullWidth
          id="outlined-error-helper-text"
          label="Alt"
          sx={{ fontSize: "2rem" }}
          helperText={errors.alt && errors.alt.message}
        />
        <TextField
          {...register("description", {
            required: "required",
          })}
          error={errors.description && true}
          fullWidth
          id="outlined-error-helper-text"
          label=" description"
          sx={{ fontSize: "2rem" }}
          helperText={errors.description && errors.description.message}
        />
        <TextField
          {...register("caption", {
            required: "required",
          })}
          fullWidth
          id="outlined-error-helper-text"
          label="caption"
          sx={{ fontSize: "2rem" }}
          defaultValue={image?.caption}
          helperText={errors.caption && errors.caption.message}
        />

        {loading ? (
          <LoadingButton
            loading
            variant="outlined"
            sx={{ width: "100%", marginTop: "1rem", height: "3rem" }}
          >
            Fetch data
          </LoadingButton>
        ) : (
          <Button
            type="submit"
            sx={{ width: "100%", marginTop: "1rem", height: "3rem" }}
            variant="contained"
          >
            Add
          </Button>
        )}
      </Box>
    </form>
  );
};

export default FormMedia;
