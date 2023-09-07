import UploadSvg from "@/svg/UploadSvg";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function DragImage({ setImg, setImage }) {
  const { palette } = useTheme();

  const onDrop = useCallback(async (acceptedFiles: any) => {
    await setImage(acceptedFiles[0]);
    await setImg(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
      height={"6rem"}
      width={"80%"}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      <Box
        sx={{
          backgroundColor: palette.primary.light,
          width: "2rem",
          height: "2rem",
          borderRadius: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UploadSvg />
      </Box>
      <p style={{ margin: "0" }}>click to Upload or darg and drop</p>
      <p style={{ margin: "0" }}>Svg, Png , Jog or GIF</p>
    </Box>
  );
}

export default DragImage;
