import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import React from "react";

const AppLoading = () => {
  return (
    <Box
      width={"100%"}
      height="100vh"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      flexDirection="column"
    >
      <Box position={"relative"} height={200} width={200}></Box>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default AppLoading;
