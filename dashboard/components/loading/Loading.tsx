import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./animation_lm2btfi4.json";
import { Box } from "@mui/material";

const Loading = () => (
  <Box
    width={"100%"}
    height={"100vh"}
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
  >
    <Lottie animationData={groovyWalkAnimation} loop={true} />
  </Box>
);

export default Loading;
