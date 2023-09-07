import { Box, Button, InputLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageDetails from "./ImageDetails";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
const AddMedia = ({}) => {
  const [img, setImg] = useState(null);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const onChange = async (e) => {
    await setImage(e.target.files[0]);
    await setImg(URL.createObjectURL(e.target.files[0]));
    setOpen(true);
  };
  return (
    <>
      <label for="actual-btn" sx={{ width: "100%" }}>
        <Box
          bgcolor={"rgb(242, 245, 250)"}
          height={"7rem"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          borderRadius="0.25rem"
          position={"relative"}
          border="0.0625rem dashed rgb(204, 195, 255)"
        >
          <AddCircleOutlinedIcon />
          <Typography>Add Image</Typography>

          <Typography>You can drop images here</Typography>
        </Box>
      </label>
      <input
        id="actual-btn"
        onChange={onChange}
        accept="image/png, image/gif, image/jpeg"
        type="file"
        hidden
      />

      <ImageDetails image={image} img={img} open={open} setOpen={setOpen} />
    </>
  );
};

export default AddMedia;
