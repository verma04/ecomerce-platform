import React from "react";

import { Box, Button, Divider, Typography } from "@mui/material";

import TextField from "@mui/material/TextField";

import AuthLayout from "../Layout/AuthLayout";
import { Inputs } from "@/types/type";
import { SubmitHandler, useForm } from "react-hook-form";

import { redirect, useRouter } from "next/navigation";

import { LoadingButton } from "@mui/lab";
import { useLogin } from "@/reactQueryHooks/mutation";
import ViewSvg from "@/svg/ViewSvg";
import HideSvg from "@/svg/HideSvg";
import { sellerEmailRegistration } from "@/grapqhl/actions/auth";
import Link from "next/link";
import toast from "react-hot-toast";
import { ErrorMessage } from "@/components/error/ErrorMessage";

const WithEmail = () => {
  const router = useRouter();

  const [password, setPassword] = React.useState(false);

  const [match, isMatch] = React.useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();

  const [login, { data, loading, error }] = sellerEmailRegistration();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login({
      variables: data,
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

  return (
    <AuthLayout>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Box
          width={"100%"}
          height={"80%"}
          position={"relative"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}
        >
          <Box
            width={"80%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <Box
              width={"100%"}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                {...register("email", {
                  required: "required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                error={errors.email && true}
                fullWidth
                id="outlined-error-helper-text"
                label="Email"
                type="email"
                sx={{ fontSize: "2rem" }}
                helperText={errors.email && errors.email.message}
              />
            </Box>
            <Box
              width={"100%"}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="2rem"
            >
              <TextField
                {...register("firstName", {
                  required: "required",
                })}
                error={errors.email && true}
                fullWidth
                id="outlined-error-helper-text"
                label="First Name"
                sx={{ fontSize: "2rem", width: "48%" }}
                helperText={errors.firstName && errors.firstName.message}
              />
              <TextField
                {...register("lastName", {
                  required: "required",
                })}
                error={errors.email && true}
                fullWidth
                id="outlined-error-helper-text"
                label="Last Name"
                sx={{ fontSize: "2rem", width: "48%" }}
                helperText={errors.lastName && errors.lastName.message}
              />
            </Box>
            <Typography
              sx={{ width: "100%", textAlign: "left" }}
              fontSize={"0.8rem"}
              color="#454f5b"
              mt="1rem"
            >
              Enter your first and last name as they appear on your
              government-issued ID.
            </Typography>

            <Box
              width={"100%"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="2rem"
              position={"relative"}
            >
              <TextField
                type={password ? "text" : "password"}
                {...register("password", {
                  required: "required",
                  minLength: {
                    value: 6,
                    message: "Your password must be at least 8 character",
                  },
                })}
                error={errors.password && true}
                fullWidth
                id="outlined-error-helper-text"
                label="Password"
                sx={{ fontSize: "2rem" }}
                helperText={errors.password && errors.password.message}
              />
              <Box
                sx={{
                  position: "absolute",
                  height: "100%",
                  right: "0%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: "1rem",
                  zIndex: 100,
                }}
                onClick={() => setPassword(!password)}
              >
                {!password ? <ViewSvg /> : <HideSvg />}
              </Box>
            </Box>

            {loading ? (
              <LoadingButton
                loading
                variant="outlined"
                sx={{ width: "100%", marginTop: "2rem", height: "3rem" }}
              >
                Fetch data
              </LoadingButton>
            ) : (
              <>
                <Button
                  type="submit"
                  sx={{ width: "100%", marginTop: "2rem", height: "3rem" }}
                  variant="contained"
                >
                  Create UrbanBazar Id
                </Button>
              </>
            )}
            <Typography
              sx={{ textAlign: "left", width: "100%" }}
              textAlign={"left"}
              marginTop={"2rem"}
            >
              By continuing, you agree to our Terms of Use and Privacy Policy.
            </Typography>

            <Typography
              sx={{ textAlign: "left", width: "100%" }}
              textAlign={"left"}
              marginBottom={"2rem"}
              marginTop={"1rem"}
            >
              Already have a Shopify ID? <Link href="/">Log in</Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default WithEmail;
