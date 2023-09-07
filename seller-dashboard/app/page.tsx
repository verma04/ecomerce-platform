"use client";
import Image from "next/image";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import jwt_decode from "jwt-decode";
export default function Home() {
  return (
    <GoogleOAuthProvider clientId="266054620100-sno7jls4vquf9ae17v9inliifqjc1r20.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse: any) => {
          console.log(credentialResponse);
          var decoded = jwt_decode(credentialResponse.credential);
          console.log(decoded);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}
