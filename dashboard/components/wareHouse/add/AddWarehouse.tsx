import React from "react";

import { Box, Button, Divider, Typography } from "@mui/material";

import TextField from "@mui/material/TextField";

import { Inputs, WareHouseType } from "@/types/type";
import { SubmitHandler, useForm } from "react-hook-form";

import { redirect, useRouter } from "next/navigation";

import { LoadingButton } from "@mui/lab";

import { sellerEmailRegistration } from "@/grapqhl/actions/auth";

import toast from "react-hot-toast";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import { addSellerWarehouse } from "@/grapqhl/actions/warehouse";
import Router from "next/router";
import Redirect from "@/comman/Redirect";

const AddWareHouse = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<WareHouseType>();

  const [login, { data, loading, error }] = addSellerWarehouse();
  const onSubmit: SubmitHandler<WareHouseType> = (data) => {
    login({
      variables: data,
    });
  };

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

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      {data && data?.addSellerWarehouse && <Redirect to="/ware-house" />}
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
          width={"60%"}
          height={"80%"}
          position={"relative"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}
        >
          <Box
            width={"80%"}
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
            >
              <TextField
                {...register("wareHouseName", {
                  required: "required",
                })}
                error={errors.wareHouseName && true}
                fullWidth
                id="outlined-error-helper-text"
                label="Warehouse name"
                sx={{ fontSize: "2rem" }}
                helperText={
                  errors.wareHouseName && errors.wareHouseName.message
                }
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
                {...register("contactPerson", {
                  required: "required",
                })}
                error={errors.contactPerson && true}
                fullWidth
                id="outlined-error-helper-text"
                label="Contact Person"
                sx={{ fontSize: "2rem", width: "48%" }}
                helperText={
                  errors.contactPerson && errors.contactPerson.message
                }
              />
              <TextField
                {...register("mobileNumber", {
                  required: "required",
                })}
                error={errors.mobileNumber && true}
                fullWidth
                id="outlined-error-helper-text"
                label="Mobile Number"
                sx={{ fontSize: "2rem", width: "48%" }}
                helperText={errors.mobileNumber && errors.mobileNumber.message}
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
                {...register("addressLine1", {
                  required: "required",
                })}
                error={errors.addressLine1 && true}
                fullWidth
                id="outlined-error-helper-text"
                label="Address Line 1"
                sx={{ fontSize: "2rem", width: "48%" }}
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
                sx={{ fontSize: "2rem", width: "48%" }}
                helperText={errors.state && errors.state.message}
              />
              <TextField
                {...register("gstIn", {
                  required: "required",
                })}
                error={errors.gstIn && true}
                fullWidth
                id="outlined-error-helper-text"
                label="GSTIN Number"
                sx={{ fontSize: "2rem", width: "48%" }}
                helperText={errors.gstIn && errors.gstIn.message}
              />
            </Box>
            {loading ? (
              <LoadingButton
                loading
                variant="outlined"
                sx={{ width: "100%", marginTop: "2rem", height: "3rem" }}
              >
                Fetch data
              </LoadingButton>
            ) : (
              <>
                <Button
                  type="submit"
                  sx={{ width: "100%", marginTop: "2rem", height: "3rem" }}
                  variant="contained"
                >
                  Add WareHouse
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default AddWareHouse;
