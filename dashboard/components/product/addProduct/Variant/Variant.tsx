import RichEditor from "@/comman/HtmlEditor";
import ImageUploadLabel from "@/comman/ImagePop/ImageUplaodLabel";
import FormLayout from "@/components/comman/Form/FormLayout";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import { addSellerCategory } from "@/grapqhl/actions/category";
import { Category, generatedVariant, variantProps } from "@/types/type";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import MultipleValue from "../MutipleValue/MultipleValue";
import MultipleColor from "../mutipleColor/MultipleColor";
import VariantPop from "./VariantPop";
import variantDropDown from "./variantData";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { v4 as uuidv4 } from "uuid";
import cartesian from "@/utils/generateVariants";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { green, red } from "@mui/material/colors";
const Variant = ({
  productInformation,
  inventory,
  variant,
  setVariant,
  variantGenerated,
  setVariantGenerated,
  handleNext,
}: variantProps) => {
  const [add, { data, loading, error }] = addSellerCategory();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Category>();

  const [description, setDescription] = React.useState("");
  const [img, setImage] = React.useState("");
  if (error) {
    toast.error(
      <>
        <ErrorMessage error={error} />
      </>,
      {
        id: "error",
      }
    );
  }
  const onSubmit: SubmitHandler<Category> = (data) => {
    add({
      variables: { ...data, description },
    });
  };

  const addVariant = (value) => {
    const find = variantDropDown.find((set) => set.name === value);

    const data = {
      ...find,
      id: uuidv4(),
      list: [],
    };
    console.log(data);

    setVariant([...variant, data]);
  };

  const deleteItem = (id) => {
    console.log(id);
    const filter = variant.filter((t) => t.id !== id);
    setVariant(filter);
  };

  React.useEffect(() => {
    const data = cartesian(variant.map((set) => set.list));
    console.log(data);

    setVariantGenerated(
      data?.map((set) => ({
        id: uuidv4(),
        variant: set,
        price: productInformation.price,
        discountedPrice: productInformation.discountedPrice,
        stock: inventory.quantity,
      }))
    );
  }, [variant]);

  return (
    <Box width="100%">
      <Box marginTop={"2rem"} width={"100%"} flexDirection={"column"}>
        <Typography>Add Variant</Typography>

        {variant.map((set: any) => (
          <Box
            marginTop={"2rem"}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <TextField
                sx={{ width: "18%" }}
                id="outlined-error-helper-text"
                label={set.name}
                type="email"
                sx={{ fontSize: "2rem" }}
                placeholder="Option name *"
                value={set.name}
                onChange={(e) => {
                  const remove = variant.filter((t) => t.id !== set.id);
                  const data = {
                    name: e.target.value,
                    type: set.type,
                    list: set.list,
                    id: set.id,
                  };

                  const index = variant.findIndex((x) => x.id === set.id);

                  variant[index] = data;
                  setVariant([...variant]);
                }}
              />

              {set.type === "text" && (
                <MultipleValue
                  setVariant={setVariant}
                  list={set}
                  data={variant}
                />
              )}
              {set.type === "color" && (
                <MultipleColor
                  setVariant={setVariant}
                  list={set}
                  data={variant}
                />
              )}

              <Box
                onClick={() => deleteItem(set.id)}
                sx={{ cursor: "pointer" }}
              >
                <DeleteOutlineIcon />
              </Box>
            </Box>
          </Box>
        ))}

        {/* <Box
          marginTop={"2rem"}
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
            <TextField
              sx={{ width: "18%" }}
              id="outlined-error-helper-text"
              label="Size"
              type="email"
              sx={{ fontSize: "2rem" }}
              placeholder="Option name *"
              value="size"
            />

            <MultipleValue />
          </Box>
        </Box>

        <Box
          marginTop={"2rem"}
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
            <TextField
              sx={{ width: "18%" }}
              id="outlined-error-helper-text"
              label="Color"
              type="email"
              sx={{ fontSize: "2rem" }}
              placeholder="Option name *"
              value="Color"
            />

            <MultipleColor />
          </Box>
        </Box> */}
        {variant.length <= 3 && <VariantPop addVariant={addVariant} />}

        <Box width={"100%"} marginTop={"2rem"} overflow={"scroll"}>
          <Box
            width={"100%"}
            bgcolor={"#f2f2f2"}
            height={"2rem"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            paddingTop={"0.2rem"}
            overflow={"scroll"}
          >
            <Box width={"20rem"} marginLeft={"1rem"}>
              Variant
            </Box>
            <Box width={"10rem"} marginLeft={"5rem"}>
              Prize
            </Box>
            <Box width={"10rem"} marginLeft={"2rem"}>
              DiscountedPrice
            </Box>
            <Box width={"10rem"} marginLeft={"2rem"}>
              Stock
            </Box>
            <Box width={"10rem"} marginLeft={"2rem"}>
              SKU
            </Box>
            <Box width={"10rem"} marginLeft={"2rem"}></Box>
          </Box>
          <Box width={"100%"} overflow={"scroll"}>
            {variantGenerated?.map((set) => (
              <Box
                marginTop={"1rem"}
                display={"flex"}
                justifyContent={"space-between"}
                height={"4rem"}
                alignItems={"center"}
                borderBottom="1px solid #f2f2f2"
              >
                <Box width={"15rem"}>
                  <Box width={"15rem"} display={"flex"}>
                    {set.variant.map((t, index) => (
                      <Box display={"flex"}>
                        <Typography
                          fontSize={"0.9rem"}
                          pr={"0.2rem"}
                          pl={"0.2rem"}
                        >
                          {index === 0 ? "" : "/"}
                        </Typography>
                        <Typography fontSize={"0.9rem"}> {t.value}</Typography>
                      </Box>
                    ))}
                  </Box>
                  {set.stock > 0 && (
                    <Box
                      color={green[700]}
                      bgcolor={green[100]}
                      sx={{
                        ml: "0.5rem",
                        textTransform: "uppercase",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        pt: "0.2rem",
                        width: "4.5rem",
                      }}
                    >
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        in Stock
                      </Typography>
                    </Box>
                  )}

                  {set.stock < 1 && (
                    <Box
                      color={red[700]}
                      bgcolor={red[100]}
                      sx={{
                        ml: "0.5rem",
                        textTransform: "uppercase",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        pt: "0.2rem",
                        width: "5.5rem",
                      }}
                    >
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        Out of Stock
                      </Typography>
                    </Box>
                  )}
                </Box>
                <TextField
                  sx={{ width: "10rem", marginLeft: "2rem" }}
                  size="small"
                  id="outlined-error"
                  type="number"
                  label="Price"
                  value={set.price}
                  onChange={(e) => {
                    const data = {
                      id: set.id,
                      variant: set.variant,
                      price: Number(e.target.value),
                      stock: set.stock,
                      discountedPrice: set.discountedPrice,
                    };

                    const index = variantGenerated.findIndex(
                      (x) => x.id === set.id
                    );
                    console.log(index);
                    // console.log(variantGenerated);

                    variantGenerated[index] = data;

                    setVariantGenerated([...variantGenerated]);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupeeIcon sx={{ fontSize: "1rem" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  sx={{ width: "10rem", marginLeft: "2rem" }}
                  size="small"
                  id="outlined-error"
                  type="number"
                  label="Discounted Price"
                  value={set.discountedPrice}
                  onChange={(e) => {
                    const data = {
                      id: set.id,
                      variant: set.variant,
                      price: set.price,
                      stock: set.stock,
                      discountedPrice: Number(e.target.value),
                    };

                    const index = variantGenerated.findIndex(
                      (x) => x.id === set.id
                    );
                    console.log(index);
                    // console.log(variantGenerated);

                    variantGenerated[index] = data;

                    setVariantGenerated([...variantGenerated]);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupeeIcon sx={{ fontSize: "1rem" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  sx={{ width: "10rem", marginLeft: "2rem" }}
                  size="small"
                  id="outlined-error"
                  label="stock"
                  type="number"
                  value={set.stock}
                  onChange={(e) => {
                    const data = {
                      id: set.id,
                      variant: set.variant,
                      price: set.price,
                      stock: Number(e.target.value),
                      discountedPrice: set.discountedPrice,
                    };
                    console.log(data);

                    console.log(variantGenerated);
                    const index = variantGenerated.findIndex(
                      (x) => x.id === set.id
                    );
                    console.log(index);

                    variantGenerated[index] = data;

                    setVariantGenerated([...variantGenerated]);
                  }}
                />
                <TextField
                  sx={{ width: "10rem", marginLeft: "2rem" }}
                  size="small"
                  id="outlined-error"
                  label="SKU"
                />
                <Box sx={{ width: "5rem", marginLeft: "2rem" }}>
                  <Button>Edit</Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
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

export default Variant;
