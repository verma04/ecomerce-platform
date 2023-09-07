import React from "react";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  width?: string | undefined | null;
};
const AuthLayout = ({ children, width }: Props) => {
  const { palette } = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={"100vh"}
      width={"100%"}
      bgcolor={palette.primary.light}
    >
      <Box
        width={width ? width : "40rem"}
        bgcolor={palette.primary.contrastText}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={"column"}
        borderRadius={"2%"}
      >
        <Box
          width={"50%"}
          height={"7rem"}
          position={"relative"}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          marginBottom={"2rem"}
        >
          <Box
            width={"90%"}
            height={"70%"}
            position={"relative"}
            display="flex"
            justifyContent="center"
          >
            <Image
              src="/logo.png"
              alt="PulsePlay Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
