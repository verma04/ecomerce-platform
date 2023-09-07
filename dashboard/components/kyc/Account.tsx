import { useGetUser } from "@/grapqhl/actions/auth";
import { sellerBankAccount } from "@/grapqhl/actions/kyc";
import { SellerBankAccount, multiStep } from "@/types/type";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const Account = ({}) => {
  const [add, { data: kyc, loading: load }] = sellerBankAccount();
  const { data: { getUser } = {}, refetch } = useGetUser();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<SellerBankAccount>();

  const onSubmit: SubmitHandler<SellerBankAccount> = async (info) => {
    add({
      variables: info,
    });
  };
  if (kyc && kyc?.sellerBankAccount) {
    refetch();
  }
  return (
    <Box
      width={"80%"}
      height={"60%"}
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      flexDirection={"column"}
    >
      <Typography variant="h2">Bank Address</Typography>
      <Typography>Required Field *</Typography>
      <form
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box marginTop={"2rem"} width={"60%"}>
          <TextField
            {...register("accountNumber", {
              required: "required",
            })}
            error={errors.accountNumber && true}
            fullWidth
            id="outlined-error-helper-text"
            label="Account Number"
            sx={{ fontSize: "2rem" }}
            helperText={errors.accountNumber && errors.accountNumber.message}
          />
        </Box>
        <Box width={"60%"} marginTop={"2rem"}>
          <TextField
            {...register("ifscCode", {
              required: "required",
            })}
            error={errors.ifscCode && true}
            fullWidth
            id="outlined-error-helper-text"
            label="IFSC Code"
            sx={{ fontSize: "2rem" }}
            helperText={errors.ifscCode && errors.ifscCode.message}
          />
        </Box>

        <Box width={"60%"} marginTop={"2rem"}>
          <TextField
            {...register("bankName", {
              required: "required",
            })}
            error={errors.bankName && true}
            fullWidth
            id="outlined-error-helper-text"
            label="Bank Name"
            sx={{ fontSize: "2rem" }}
            helperText={errors.bankName && errors.bankName.message}
          />
        </Box>

        {load ? (
          <LoadingButton
            loading
            variant="outlined"
            sx={{ marginTop: "2rem", padding: "0.7rem", width: "60%" }}
          >
            Fetch data
          </LoadingButton>
        ) : (
          <Button
            sx={{ marginTop: "2rem", padding: "0.7rem", width: "60%" }}
            variant="contained"
            type="submit"
          >
            Continue
          </Button>
        )}
      </form>
    </Box>
  );
};

export default Account;
