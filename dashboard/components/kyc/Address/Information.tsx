import { sellerAddress } from "@/grapqhl/actions/kyc";
import { Address, AddressType } from "@/types/type";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const Information = ({ data, handleNext }: any) => {
  const [add, { data: kyc, loading: load }] = sellerAddress();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<AddressType>();

  const [landMark, setLandMark] = React.useState(data[0].Name);
  const handleChange = (event: SelectChangeEvent) => {
    setLandMark(event.target.value as string);
  };
  const onSubmit: SubmitHandler<AddressType> = async (info) => {
    const set = {
      ...info,
      landMark,
      state: data[0].State,
      country: data[0].Country,
      pinCode: data[0].Pincode,
      city: data[0]?.District,
    };
    add({
      variables: set,
    });
  };
  return (
    <form
      style={{
        width: "80%",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {kyc && kyc?.sellerAddress && handleNext(3)}
      <Box marginTop={"2rem"} width={"48%"}>
        <TextField
          {...register("addressLine1", {
            required: "required",
          })}
          error={errors.addressLine1 && true}
          fullWidth
          id="outlined-error-helper-text"
          label="Address Line 1"
          sx={{ fontSize: "2rem" }}
          helperText={errors.addressLine1 && errors.addressLine1.message}
        />
      </Box>

      <Box marginTop={"2rem"} width={"48%"}>
        <TextField
          {...register("addressLine2", {
            required: "required",
          })}
          error={errors.addressLine2 && true}
          fullWidth
          id="outlined-error-helper-text"
          label="Address Line 1"
          sx={{ fontSize: "2rem" }}
          helperText={errors.addressLine2 && errors.addressLine2.message}
        />
      </Box>

      <Box marginTop={"2rem"} width={"48%"}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">LandMark</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={landMark}
            label="LandMark"
            onChange={handleChange}
          >
            {data.map((t: any, index: any) => (
              <MenuItem key={index} value={t?.Name}>
                {t?.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box marginTop={"2rem"} width={"48%"}>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="City"
          sx={{ fontSize: "2rem" }}
          value={data[0]?.District}
        />
      </Box>

      <Box marginTop={"2rem"} width={"48%"}>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="PinCode"
          sx={{ fontSize: "2rem" }}
          value={data[0].Pincode}
          disabled
        />
      </Box>

      <Box marginTop={"2rem"} width={"48%"}>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="State"
          disabled
          sx={{ fontSize: "2rem" }}
          value={data[0].State}
        />
      </Box>
      <Box marginTop={"2rem"} width={"48%"}>
        <TextField
          disabled
          fullWidth
          id="outlined-error-helper-text"
          label="Country"
          sx={{ fontSize: "2rem" }}
          value={"India"}
        />
      </Box>

      {load ? (
        <LoadingButton
          loading
          variant="outlined"
          sx={{ marginTop: "2rem", padding: "0.7rem", width: "53%" }}
        >
          Fetch data
        </LoadingButton>
      ) : (
        <Button
          type="submit"
          sx={{ marginTop: "2rem", padding: "0.7rem", width: "53%" }}
          variant="contained"
        >
          Continue
        </Button>
      )}
    </form>
  );
};

export default Information;
