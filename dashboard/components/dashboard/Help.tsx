import { Box, Typography } from "@mui/material";
import React from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
const Help = () => {
  return (
    <Box width={"49%"} display={"flex"} flexDirection={"column"}>
      <Typography marginBottom={"1rem"} variant="h2">
        Need some help
      </Typography>

      <Box
        width={"100%"}
        gap={"1rem"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box
          width={"50%"}
          height={"7rem"}
          sx={{
            border: "1px solid #E1E7EC",
            background: "white",
            borderRadius: "10px",
          }}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"flx-start"}
          position={"relative"}
          pl="1rem"
        >
          Need some help
          <Typography pt="1rem">
            Share your feature request or feedback, we’re all ears
          </Typography>
          <Box position={"absolute"} height={"100%"} right={"0%"} width={"10%"}>
            <ChevronRightIcon sx={{ marginTop: "1.5rem" }} />
          </Box>
        </Box>
        <Box
          width={"50%"}
          height={"7rem"}
          sx={{
            border: "1px solid #E1E7EC",
            background: "white",
            borderRadius: "10px",
          }}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"flx-start"}
          position={"relative"}
          pl="1rem"
        >
          Need some help
          <Typography pt="1rem">
            Reach out to community, support or your personal assistant
          </Typography>
          <Box position={"absolute"} height={"100%"} right={"0%"} width={"10%"}>
            <ChevronRightIcon sx={{ marginTop: "1.5rem" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Help;
