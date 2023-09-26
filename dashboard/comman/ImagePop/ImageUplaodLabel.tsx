// import UplodSvg from "@components/svg/UplodSvg";

import {
  Backdrop,
  Box,
  Fade,
  InputLabel,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const prod = process.env.NODE_ENV === "production";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageUpload from "./ImageUpload";
import UploadSvg from "@/svg/UploadSvg";

const ImageUploadLabel = ({
  img,
  setImage,
  name,
  label,
  error,
  width,
}: any) => {
  const StyledBox = styled(Box)(({}) => ({
    width: width ? width : "47%",
    marginTop: "2rem",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    ".box": {
      marginTop: "1rem",
      width: "10rem",
      height: "10rem",
      backgroundColor: "#f8faf7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid",
      borderRadius: "10px",
    },
  }));
  const [pop, setPop] = useState(false);
  const coverImage = async (data: any) => {
    await setImage(data);
    await setPop(false);
  };
  const set = prod
    ? "https://sanchay.merinolaminates.com/assert"
    : "http://localhost:4000/assert";

  return (
    <>
      <StyledBox>
        <InputLabel
          sx={{
            marginTop: "1rem",
            textTransform: "uppercase",
            fontSize: "0.8rem",
          }}
        >
          {label}*
        </InputLabel>

        <label onClick={() => setPop(true)} className="box">
          {img ? (
            <img
              style={{ width: "90%", height: "90%", objectFit: "contain" }}
              alt={`${process.env.NEXT_PUBLIC_IMG}${img.url}`}
              src={`${process.env.NEXT_PUBLIC_IMG}${img.url}`}
            />
          ) : (
            <UploadSvg />
          )}
        </label>

        <div style={{ marginTop: "1rem", color: "red" }} className="error">
          {error && "Upload  to continue"}
        </div>
      </StyledBox>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={pop}
        onClose={() => setPop(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={pop}>
          <Box width={"100%"}>
            <ImageUpload setstate={setPop} set={coverImage} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ImageUploadLabel;
