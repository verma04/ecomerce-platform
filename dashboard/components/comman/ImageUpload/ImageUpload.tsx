import React from "react";
import DragImage from "./DragImage";
import { Box } from "@mui/material";

const ImageUpload = ({ img, setImg, image, setImage }) => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box width="4rem" height={"4rem"}>
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src="/logo.png"
        />
      </Box>

      <DragImage setImg={setImg} setImage={setImage} />
    </Box>
  );
};

export default ImageUpload;
