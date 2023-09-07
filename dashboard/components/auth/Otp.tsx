import React from "react";
import AuthLayout from "./Layout/AuthLayout";
import OtpInput from "react-otp-input";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

import { redirect, usePathname, useSearchParams } from "next/navigation";

import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";

import { useVerifyOtpLogin } from "@/reactQueryHooks/mutation";
import useVerifyToken from "@/reactQueryHooks/query";
interface props {
  id: String;
}
const Otp = ({ id }: props) => {
  const router = useRouter();
  const { palette } = useTheme();
  const [otp, setOtp] = React.useState("");

  const { mutate, data, isLoading, isError } = useVerifyOtpLogin();
  const { status, data: data1, error } = useVerifyToken(id);

  const searchParams = useSearchParams();

  const onSubmit = () => {
    mutate({
      otp: otp,
      token: id,
    });
  };

  if (data) {
    router.push("/kyc");
  }

  return (
    <AuthLayout>
      <Box
        width={"80%"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
        marginBottom={"2rem"}
      >
        <Box mt="2rem" mb="2rem" width={"100%"}>
          <Typography variant="h1">Verify code </Typography>
          <Typography> Enter verfication code sent to you at </Typography>
          <Typography variant="h2">{data1?.email}</Typography>
        </Box>

        <Box marginBottom={"3rem"} width={"100%"}>
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Typography>Code</Typography>
            <Typography>
              Didn`t get the code?
              <span
                style={{ color: palette.primary.light, marginLeft: "0.5rem" }}
              >
                Resend OTP
              </span>
            </Typography>
          </Box>
          <OtpInput
            containerStyle={{
              height: "3rem",
              marginTop: "2rem",
              marginBottom: "1rem",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
            inputStyle={{ height: "4rem", width: "17%" }}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
          />
          {isLoading ? (
            <LoadingButton
              loading
              variant="outlined"
              sx={{ width: "100%", marginTop: "1rem", height: "3rem" }}
            >
              Fetch data
            </LoadingButton>
          ) : (
            <Button
              onClick={() => onSubmit()}
              type="submit"
              sx={{ width: "100%", marginTop: "1rem", height: "3rem" }}
              variant="contained"
            >
              Get Started
            </Button>
          )}
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Otp;
