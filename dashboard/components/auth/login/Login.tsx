import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import AuthLayout from "../Layout/AuthLayout";
import { Inputs } from "@/types/type";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import { sellerLogin } from "@/grapqhl/actions/auth";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import toast from "react-hot-toast";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const router = useRouter();
  const { palette } = useTheme();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();
  const [login, { data, loading, error }] = sellerLogin();
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
  if (data && data?.sellerLogin) {
    router.push(`/lookup?email=${data?.sellerLogin?.email}`);
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
              sx={{ fontSize: "2rem" }}
              helperText={errors.email && errors.email.message}
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
                Continue with email
              </Button>
            )}

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Divider sx={{ width: "30%" }} />
              <Typography marginTop={"2rem"} marginBottom={"2rem"}>
                or get started with
              </Typography>
              <Divider sx={{ width: "30%" }} />
            </Box>

            <GoogleLogin />

            <Typography marginTop={"2rem"}>
              By continuing, you agree to our Terms of Use and Privacy Policy.
            </Typography>

            <Typography
              sx={{ width: "100%", textAlign: "left" }}
              marginBottom={"2rem"}
              marginTop={"0.5rem"}
            >
              New to Shopify? <Link href="/sign-up">Get started</Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default Login;
