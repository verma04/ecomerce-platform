import RichEditor from "@/comman/HtmlEditor";
import ImageUploadLabel from "@/comman/ImagePop/ImageUplaodLabel";

import { Category, ImageProps, productInformationProps } from "@/types/type";
import { Box, Button } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ImageUploadLabelMulti from "@/comman/ImagePop/ImageUplaodLabelMulti";
const CategoryDetails = ({ handleNext, img, setImg }: ImageProps) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Category>();

  return (
    <Box width="100%">
      <form style={{ width: "100%" }}>
        <Box
          marginTop={"2rem"}
          display={"flex"}
          width={"100%"}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          {img.map((set, index) => (
            <img
              key={index}
              style={{
                width: "10rem",
                height: "10rem",
                objectFit: "cover",
                padding: "1rem",
                marginTop: "4rem",
              }}
              alt={`${process.env.NEXT_PUBLIC_IMG}${set?.url}`}
              src={`${process.env.NEXT_PUBLIC_IMG}${set?.url}`}
            />
          ))}
          <Box ml="2rem">
            <ImageUploadLabelMulti
              label="Product Images"
              img={img}
              setImage={setImg}
            />
          </Box>
        </Box>
      </form>

      <Box
        position={"absolute"}
        width={"60%"}
        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
      >
        <Box sx={{ flex: "1 1 auto" }} />

        <Button onClick={handleNext} type="submit" sx={{ mr: 1 }}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryDetails;
