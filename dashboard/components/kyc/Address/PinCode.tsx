import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { Inputs, PinCode } from "@/types/type";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
const PinCode = ({ setCheckPinCode, setPinCode }) => {
  const [data, setData] = React.useState({});
  const [loading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<PinCode>();
  const onSubmit: SubmitHandler<PinCode> = async (data) => {
    try {
      await setIsLoading(true);

      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${data.code}`
      );
      await setIsLoading(false);

      const set = response.data[0];

      if (set.Status === "Error") {
        toast.error(<>No PinCode found</>, {
          id: "error",
        });
      } else {
        console.log(set);
        setPinCode(set);
        setCheckPinCode(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Box marginTop={"2rem"} width={"60%"}>
        <TextField
          {...register("code", {
            required: "required",
            minLength: 6,
            maxLength: 6,
          })}
          error={errors.code && true}
          fullWidth
          id="outlined-error-helper-text"
          label="Enter Pin Code"
          sx={{ fontSize: "2rem" }}
          helperText={errors.code && errors.code.message}
          type="number"
        />
      </Box>

      {loading ? (
        <LoadingButton
          loading
          variant="outlined"
          sx={{ marginTop: "2rem", padding: "0.7rem", width: "60%" }}
        >
          Fetch data
        </LoadingButton>
      ) : (
        <Button
          type="submit"
          sx={{ marginTop: "2rem", padding: "0.7rem", width: "60%" }}
          variant="contained"
        >
          Check
        </Button>
      )}
    </form>
  );
};

export default PinCode;
