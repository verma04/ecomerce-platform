import { StoreKyc, multiStep } from "@/types/type";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageUpload from "../comman/ImageUpload/ImageUpload";
import { Label } from "@mui/icons-material";
import { storeKyc } from "@/grapqhl/actions/kyc";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

const Store = ({ handleNext }: multiStep) => {
  const [img, setImg] = useState(null);
  const [image, setImage] = useState(null);
  const [add, { data: kyc, loading: load }] = storeKyc();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<StoreKyc>();

  const onSubmit: SubmitHandler<StoreKyc> = (data) => {
    console.log(image);
    add({
      variables: { ...data, logo: image },
    });
  };
  return (
    <Box
      width={"80%"}
      height={"60%"}
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      flexDirection={"column"}
    >
      {kyc && kyc?.storeKyc && handleNext(2)}
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2">Store Information</Typography>
        <Typography>Required Field *</Typography>

        <Box marginTop={"2rem"} width={"60%"}>
          <TextField
            fullWidth
            {...register("gstIn", {
              required: "required",
            })}
            error={errors.gstIn && true}
            id="outlined-error-helper-text"
            label="Gst Number"
            sx={{ fontSize: "2rem" }}
            helperText={errors.gstIn && errors.gstIn.message}
          />
        </Box>
        <Box marginTop={"2rem"} width={"60%"}>
          <TextField
            fullWidth
            {...register("storeName", {
              required: "required",
            })}
            error={errors.storeName && true}
            id="outlined-error-helper-text"
            label="Store Name*"
            sx={{ fontSize: "2rem" }}
            helperText={errors.storeName && errors.storeName.message}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          width={"60%"}
          marginTop={"2rem"}
          flexDirection={"column"}
        >
          <InputLabel>Upload Store Image</InputLabel>
          <ImageUpload
            img={img}
            setImg={setImg}
            image={image}
            setImage={setImage}
          />
        </Box>

        {load ? (
          <LoadingButton
            loading
            variant="outlined"
            sx={{ marginTop: "2rem", padding: "0.7rem", width: "60%" }}
          >
            Fetch data
          </LoadingButton>
        ) : (
          <Button
            type="submit"
            sx={{ marginTop: "2rem", padding: "0.7rem", width: "60%" }}
            variant="contained"
          >
            Continue
          </Button>
        )}
      </form>
    </Box>
  );
};

export default Store;
