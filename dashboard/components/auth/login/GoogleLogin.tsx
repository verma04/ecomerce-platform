import { Button } from "@mui/material";
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { sellerGoogleLogin } from "@/grapqhl/actions/auth";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import { useRouter } from "next/router";
const GoogleAuthLogin = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [login, { data, loading, error }] = sellerGoogleLogin();
  const onSubmit = (data: any) => {
    setEmail(data.email);
    const set = {
      sellerGoogleLoginId: data.jti,
      email: data.email,
    };
    login({
      variables: set,
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

  if (data && data?.sellerGoogleLogin?.loginType === "email") {
    router.push(`/lookup?email=${email}`);
  }

  if (data && data?.sellerGoogleLogin?.loginType !== "email") {
    router.push(`/dashboard`);
  }

  return (
    <>
      {loading ? (
        <LoadingButton
          loading
          variant="outlined"
          sx={{ width: "100%", height: "3rem" }}
        >
          Fetch data
        </LoadingButton>
      ) : (
        <Button variant="outlined" sx={{ width: "100%" }}>
          <GoogleOAuthProvider clientId="266054620100-sno7jls4vquf9ae17v9inliifqjc1r20.apps.googleusercontent.com">
            <GoogleLogin
              width={"800px"}
              onSuccess={async (credentialResponse: any) => {
                var decoded = await jwt_decode(credentialResponse.credential);

                await onSubmit(decoded);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            ></GoogleLogin>
          </GoogleOAuthProvider>
        </Button>
      )}
    </>
  );
};

export default GoogleAuthLogin;
