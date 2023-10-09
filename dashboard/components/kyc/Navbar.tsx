import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useGetUser } from "@/grapqhl/actions/auth";

const Navbar = () => {
  const { palette } = useTheme();

  return (
    <Box
      position={"fixed"}
      width={"100%"}
      bgcolor={palette.secondary.light}
      height={"10vh"}
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
        marginRight={"2rem"}
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
