import Redirect from "@/comman/Redirect";
import BackSvg from "@/svg/BackSvg";
import { FormLayout } from "@/types/type";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const FormLayout = ({ children, backUrl, buttonName }: FormLayout) => {
  const router = useRouter();
  return (
    <form style={{ width: "100%", position: "relative" }}>
      <Box
        width={"100%"}
        sx={{
          top: "-10vh",
          zIndex: 100,
          position: "absolute",
          height: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => (backUrl ? router.push(backUrl) : router.back())}
        >
          <BackSvg />
        </Box>
        <Box>
          <Button sx={{ color: "white" }}>
            {buttonName ? buttonName : "Add"}
          </Button>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"center"} width={"100%"}>
        <Box mt="2rem" width={"60%"}>
          {children}
        </Box>
      </Box>
    </form>
  );
};

export default FormLayout;
