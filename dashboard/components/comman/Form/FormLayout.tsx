import Redirect from "@/comman/Redirect";
import BackSvg from "@/svg/BackSvg";
import { FormLayout } from "@/types/type";
import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const FormLayout = ({ children, backUrl, buttonName, loading }: FormLayout) => {
  const router = useRouter();
  return (
    <Box style={{ width: "100%", position: "relative" }}>
      <Box
        width={"80%"}
        sx={{
          top: "1%",
          zIndex: 100,
          position: "fixed",
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
          {loading ? (
            <LoadingButton loading variant="outlined">
              Fetch data
            </LoadingButton>
          ) : (
            <Button type="submit" sx={{ color: "white" }}>
              {buttonName ? buttonName : "Add"}
            </Button>
          )}
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"center"} width={"100%"}>
        <Box mt="2rem" width={"60%"}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default FormLayout;
