import RichEditor from "@/comman/HtmlEditor";
import ImageUploadLabel from "@/comman/ImagePop/ImageUplaodLabel";
import FormLayout from "@/components/comman/Form/FormLayout";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import {
  addSellerCategory,
  getCategorySelect,
} from "@/grapqhl/actions/category";
import { addCustomer } from "@/grapqhl/actions/customer";
import { Category, userAddressType, userType } from "@/types/type";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const CustomersDetails = ({ address, setAddress, basic }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<userAddressType>();

  const [add, { data: data1, loading, error }] = addCustomer();

  const onSubmit: SubmitHandler<userAddressType> = (data) => {
    setAddress(data);
    const fin = {
      ...basic,
      address: JSON.stringify(data),
    };
    console.log(fin);
    add({
      variables: fin,
    });
  };

  if (data1 && data1?.addCustomer) {
    router.push("/customers");
  }
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

  const [img, setImage] = React.useState("");

  const { data } = getCategorySelect();

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Box
        width={"100%"}
        height={"80%"}
        position={"relative"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
      >
        <Box
          width={"100%"}
          height={"80%"}
          position={"relative"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}
        >
          <Box
            width={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <Box
              width={"100%"}
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Box>
            <Box
              width={"100%"}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="2rem"
            ></Box>
            <Box
              width={"100%"}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="2rem"
            >
              <TextField
                {...register("addressLine1", {
                  required: "required",
                })}
                error={errors.addressLine1 && true}
                fullWidth
                id="outlined-error-helper-text"
                label="Address Line 1"
                sx={{ fontSize: "2rem", width: "48%" }}
                defaultValue={address.addressLine1}
                helperText={errors.addressLine1 && errors.addressLine1.message}
              />
              <TextField
                {...register("addressLine2", {
                  required: "required",
                })}
                error={errors.addressLine2 && true}
                fullWidth
                id="outlined-error-helper-text"
                label="Address Line 1"
                defaultValue={address.addressLine2}
                sx={{ fontSize: "2rem", width: "48%" }}
                helperText={errors.addressLine2 && errors.addressLine2.message}
              />
            </Box>
            <Box
              width={"100%"}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="2rem"
            >
              <TextField
                {...register("pinCode", {
                  required: "required",
                })}
                error={errors.pinCode && true}
                fullWidth
                id="outlined-error-helper-text"
                label="Pin code"
                sx={{ fontSize: "2rem", width: "48%" }}
                defaultValue={address.pinCode}
                helperText={errors.pinCode && errors.pinCode.message}
              />
              <TextField
                {...register("city", {
                  required: "required",
                })}
                error={errors.city && true}
                fullWidth
                id="outlined-error-helper-text"
                label="City"
                sx={{ fontSize: "2rem", width: "48%" }}
                defaultValue={address.city}
                helperText={errors.city && errors.city.message}
              />
            </Box>{" "}
            <Box
              width={"100%"}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="2rem"
            >
              <TextField
                {...register("state", {
                  required: "required",
                })}
                error={errors.state && true}
                fullWidth
                id="outlined-error-helper-text"
                label="State"
                defaultValue={address.state}
                sx={{ fontSize: "2rem", width: "48%" }}
                helperText={errors.state && errors.state.message}
              />

              <TextField
                {...register("country", {
                  required: "required",
                })}
                error={errors.country && true}
                fullWidth
                id="outlined-error-helper-text"
                label="State"
                defaultValue={address.county}
                sx={{ fontSize: "2rem", width: "48%" }}
                helperText={errors.country && errors.country.message}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Button type="submit" sx={{ mr: 1 }}>
        Next
      </Button>
    </form>
  );
};

export default CustomersDetails;
