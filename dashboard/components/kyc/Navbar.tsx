import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const { palette } = useTheme();
  return (
    <Box
      position={"fixed"}
      width={"100%"}
      bgcolor={palette.secondary.light}
      height={"14vh"}
      display="flex"
      justifyContent="flex-end"
      alignItems={"center"}
      zIndex={-1}
    >
      <Box
        width={"10%"}
        height={"70%"}
        position={"relative"}
        display="flex"
        justifyContent="flex-end"
        alignItems={"center"}
      >
        <Image
          src="/DeshBazaarLogoWhite.png"
          alt="PulsePlay Logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
