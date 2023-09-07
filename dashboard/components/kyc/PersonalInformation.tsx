import { useGetUser } from "@/grapqhl/actions/auth";
import { kycSellerProfile, sellerProfile } from "@/grapqhl/actions/kyc";
import { PersonalInformation, multiStep } from "@/types/type";
import { AccountCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const PersonalInformation = ({ handleNext }: multiStep) => {
  const { data: { getUser } = {} } = useGetUser();
  const { data, loading } = sellerProfile();
  const [add, { data: kyc, loading: load }] = kycSellerProfile();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<PersonalInformation>();

  const onSubmit: SubmitHandler<PersonalInformation> = (data) => {
    add({
      variables: data,
    });
  };

  if (loading) return null;

  return (
    <Box
      width={"80%"}
      height={"60%"}
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      flexDirection={"column"}
    >
      {kyc && kyc?.sellerProfile && handleNext(1)}
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2">Personal Information</Typography>
        <Typography>Required Field *</Typography>

        <Box marginTop={"2rem"} width={"60%"}>
          <TextField
            fullWidth
            {...register("firstName", {
              required: "required",
            })}
            error={errors.firstName && true}
            id="outlined-error-helper-text"
            label="First Name*"
            sx={{ fontSize: "2rem" }}
            helperText={errors.firstName && errors.firstName.message}
            defaultValue={data?.getSellerProfile?.firstName}
          />
        </Box>
        <Box width={"60%"} marginTop={"2rem"}>
          <TextField
            fullWidth
            {...register("lastName", {
              required: "required",
            })}
            error={errors.lastName && true}
            id="outlined-error-helper-text"
            label="Last Name*"
            sx={{ fontSize: "2rem" }}
            helperText={errors.lastName && errors.lastName.message}
            defaultValue={data?.getSellerProfile?.lastName}
          />
        </Box>

        <Box width={"60%"} marginTop={"2rem"}>
          <TextField
            fullWidth
            id="outlined-error-helper-text"
            label="Email*"
            sx={{ fontSize: "2rem" }}
            disabled
            value={getUser?.email}
          />
        </Box>

        <Box width={"60%"} marginTop={"2rem"}>
          <TextField
            fullWidth
            {...register("phone", {
              required: "required",

              minLength: 10,
              maxLength: 10,
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            error={errors.phone && true}
            id="outlined-error-helper-text"
            label="Phone*"
            type="number"
            sx={{ fontSize: "2rem" }}
            helperText={errors.phone && errors.phone.message}
            defaultValue={data?.getSellerProfile?.phone}
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

export default PersonalInformation;
