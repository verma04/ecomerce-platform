import { Box, Divider, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const LoadingTable = () => {
  return (
    <Box
      width={"100%"}
      height={"100vh"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow:
          "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14)",
      }}
    >
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          height={"6rem"}
          gap={"2rem"}
          marginLeft={"2rem"}
        >
          {[1, 2, 3, 4].map((set) => (
            <Skeleton
              sx={{ bgcolor: "grey[900]" }}
              variant="rectangular"
              width={"10rem"}
              height={"50%"}
            />
          ))}
        </Box>
        <Box
          mr="2rem"
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          height={"6rem"}
          gap={"2rem"}
          marginLeft={"2rem"}
        >
          <Skeleton
            sx={{ bgcolor: "grey[900]" }}
            variant="rectangular"
            width={"10rem"}
            height={"50%"}
          />
        </Box>
      </Box>
      {[1, 2, 3, 4, , 5, 6, 7, 8].map((set) => (
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          height={"10vh"}
          flexDirection={"column"}
          alignItems={"center"}
          borderTop={"1px solid rgba(224, 224, 224, 1)"}
        >
          <Skeleton
            sx={{ bgcolor: "grey[900]" }}
            variant="rectangular"
            width={"95%"}
            height={"50%"}
          />
        </Box>
      ))}
    </Box>
  );
};

export default LoadingTable;
