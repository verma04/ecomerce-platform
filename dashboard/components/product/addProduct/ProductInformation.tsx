import {
  getCategorySelect,
  getSellerCategory,
} from "@/grapqhl/actions/category";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { unit } from "@/utils/Uint";
import { InformationProduct, productInformationProps } from "@/types/type";
import toast from "react-hot-toast";
import { green } from "@mui/material/colors";

const ProductInformation = ({
  productInformation,
  setProductInformation,
  handleNext,
}: productInformationProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<InformationProduct>();

  const onSubmit: SubmitHandler<InformationProduct> = (data) => {
    if (Number(data.discountedPrice) > Number(data.price)) {
      toast.error("Discounted Price must be less then or equal to price ");
    } else {
      const fin = {
        productName: data.productName,
        category: data.category,
        price: Number(data.price),
        discountedPrice: Number(data.discountedPrice),
        productPerUnit: Number(data.productPerUnit),
        unit: data.unit,
      };

      setProductInformation(fin);
      handleNext();
    }
  };
  const { price, discountedPrice } = getValues();
  const { data, loading, refetch } = getSellerCategory();
  watch();
  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box
          width={"90%"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="2rem"
          flexWrap={"wrap"}
        >
          <TextField
            fullWidth
            id="outlined-error-helper-text"
            label="Product Name"
            sx={{ fontSize: "2rem", width: "100%" }}
            {...register("productName", {
              required: "required",
            })}
            defaultValue={productInformation.productName}
            helperText={errors.productName && errors.productName.message}
            error={errors.productName && true}
          />

          <FormControl sx={{ width: "100%", marginTop: "2rem" }}>
            <TextField
              select
              fullWidth
              defaultValue={productInformation.category}
              label="Select"
              inputProps={register("category", {
                required: "required",
              })}
              error={errors.category && true}
              helperText={errors.category?.message}
            >
              {data?.getSellerCategory.map((set: any, index: any) => (
                <MenuItem key={index} value={set?.id}>
                  {set?.subCategory.title}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>

        <Box
          width={"90%"}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          marginTop={"2rem"}
          position={"relative"}
        >
          <TextField
            fullWidth
            id="outlined-error-helper-text"
            label="Price"
            defaultValue={productInformation.price}
            sx={{ fontSize: "2rem", width: "48%" }}
            {...register("price", {
              required: "required",
            })}
            type="number"
            inputMode="numeric"
            helperText={errors.price && errors.price.message}
            error={errors.price && true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            id="outlined-error-helper-text"
            label="Discounted Price"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            defaultValue={productInformation.discountedPrice}
            sx={{ fontSize: "2rem", width: "48%" }}
            {...register("discountedPrice", {
              required: "required",
            })}
            helperText={
              errors.discountedPrice && errors.discountedPrice.message
            }
            error={errors.discountedPrice && true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box position={"absolute"} right={"-7%"} marginTop={"0.5rem"}>
            {/* {discountedPrice !== "" ? (
              <Box
                color={green[700]}
                bgcolor={green[100]}
                sx={{
                  ml: "0.5rem",
                  textTransform: "uppercase",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  p: "0.5rem",
                }}
              >
                {price !== "" ? (
                  <>{(price * ((100 - discountedPrice) / 100)).toFixed(2)}%</>
                ) : null}
              </Box>
            ) : null} */}
          </Box>
        </Box>

        <Box
          width={"90%"}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          mt="2rem"
          flexWrap={"wrap"}
        >
          <TextField
            fullWidth
            id="outlined-error-helper-text"
            defaultValue={productInformation.productPerUnit}
            label="Product Per Unit"
            sx={{ fontSize: "2rem", width: "48%" }}
            type="number"
            {...register("productPerUnit", {
              required: "required",
            })}
            helperText={errors.productPerUnit && errors.productPerUnit.message}
            error={errors.productPerUnit && true}
          />
          <FormControl sx={{ width: "25%" }}>
            <TextField
              select
              fullWidth
              defaultValue={productInformation.unit}
              label="Select unit"
              inputProps={register("unit", {
                required: "required",
              })}
              error={errors.unit && true}
              helperText={errors.unit?.message}
            >
              {unit.map((set: any, index: any) => (
                <MenuItem key={index} value={set}>
                  {set}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          {getValues().unit !== "" && getValues().productPerUnit !== "" && (
            <Box marginTop={"1rem"} ml="2rem">
              {getValues().productPerUnit} per {getValues().unit}
            </Box>
          )}
        </Box>
      </Box>
      <Box
        position={"absolute"}
        width={"60%"}
        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
      >
        <Box sx={{ flex: "1 1 auto" }} />

        <Button type="submit" sx={{ mr: 1 }}>
          Next
        </Button>
      </Box>
    </form>
  );
};

export default ProductInformation;
