//@ts-nocheck

import React from "react";
import AddMedia from "./addMedia/AddMedia";

import { Box } from "@mui/material";
import { getAllImages } from "@/grapqhl/actions/assets";

const Media = () => {
  const { loading, data, error } = getAllImages();

  return (
    <Box>
      <AddMedia />

      <Box
        marginTop={"2em"}
        display={"flex"}
        justifyContent={"flex-start"}
        flexWrap={"wrap"}
      >
<<<<<<< HEAD
        {data?.getAllImages?.map((set: any, key: any) => (
=======
        {data?.getAllImages?.map((set: any, key) => (
>>>>>>> 3c4c8f0ef3103b13036327f16ab4d1534afd41b0
          <Box
            key={key}
            margin={"1rem"}
            border="1px solid grey"
            width={"7rem"}
            height={"7rem"}
          >
            <img
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
              src={`${process.env.NEXT_PUBLIC_IMG}${set?.url}`}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Media;
