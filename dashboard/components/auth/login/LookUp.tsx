import React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import TextField from "@mui/material/TextField";

import AuthLayout from "../Layout/AuthLayout";
import { Inputs } from "@/types/type";
import { SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useSearchParams, useParams } from "next/navigation";
import { sellerLoginWithPassword } from "@/grapqhl/actions/auth";
import { LoadingButton } from "@mui/lab";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import toast from "react-hot-toast";
const LookUp = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [login, { data, loading, error }] = sellerLoginWithPassword();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login({
      variables: {
        email,
        password: data.password,
      },
    });
  };
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

  if (data && data?.sellerLoginWithPassword) {
    router.push(`/dashboard`);
  }
  return (
    <AuthLayout>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Box
          width={"100%"}
          height={"70%"}
          position={"relative"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}
        >
          <Box
            width={"70%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <TextField
              {...register("password", {
                required: "required",
              })}
              error={errors.password && true}
              fullWidth
              id="outlined-error-helper-text"
              label="Password"
              sx={{ fontSize: "2rem" }}
              helperText={errors.password && errors.password.message}
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
                Login
              </Button>
            )}

            <Typography marginBottom={"2rem"} marginTop={"2rem"}></Typography>
          </Box>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LookUp;
