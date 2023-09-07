import React from "react";

import { Box, Button, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import jwt_decode from "jwt-decode";
import AuthLayout from "../Layout/AuthLayout";
import { Inputs } from "@/types/type";
import { SubmitHandler, useForm } from "react-hook-form";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";

import EmailSvg from "@/svg/EmailSvg";
import Link from "next/link";
import { sellerGoogleRegistration } from "@/grapqhl/actions/auth";
import { LoadingButton } from "@mui/lab";

const Register = () => {
  const router = useRouter();
  const { palette } = useTheme();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();

  const [login, { data, loading, error }] = sellerGoogleRegistration();
  const onSubmit = (data: any) => {
    console.log(data);
    const set = {
      firstName: data.given_name,
      lastName: data.family_name,
      sellerGoogleRegistrationId: data.jti,
      email: data.email,
    };
    login({
      variables: set,
    });
  };

  // watch input value by passing the name of it

  return (
    <AuthLayout>
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
          <Typography sx={{ marginBottom: "2rem" }}>
            Create a UrbanBazar ID One last step before starting your free
            trial.
          </Typography>
          <Button
            href="/sign-up/with-email"
            sx={{ width: "90%", height: "3rem", marginBottom: "1rem" }}
            variant="outlined"
          >
            <Box height={"90%"} mr="1rem">
              <EmailSvg />
            </Box>
            SignUp with Email
          </Button>

          {loading ? (
            <LoadingButton
              loading
              variant="outlined"
              sx={{ width: "90%", height: "3rem" }}
            >
              Fetch data
            </LoadingButton>
          ) : (
            <Button variant="outlined" sx={{ width: "90%" }}>
              <GoogleOAuthProvider clientId="266054620100-sno7jls4vquf9ae17v9inliifqjc1r20.apps.googleusercontent.com">
                <GoogleLogin
                  width={"800px"}
                  onSuccess={async (credentialResponse: any) => {
                    var decoded = await jwt_decode(
                      credentialResponse.credential
                    );

                    await onSubmit(decoded);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                ></GoogleLogin>
              </GoogleOAuthProvider>
            </Button>
          )}

          <Typography marginBottom={"1rem"} marginTop={"2rem"}>
            By proceeding, you agree to the Terms and Conditions and Privacy
            Policy
          </Typography>

          <Typography
            textAlign={"left"}
            marginBottom={"2rem"}
            marginTop={"0.5rem"}
            sx={{ width: "100%", textAlign: "left" }}
          >
            Already have a Shopify ID? <Link href="/">Log in </Link>
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Register;
