import { multiStep } from "@/types/type";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import PinCode from "./PinCode";
import Information from "./Information";

const Address = ({ handleNext }: multiStep) => {
  const [checkPinCode, setCheckPinCode] = React.useState(false);
  const [pinCode, setPinCode] = React.useState([]);
  return (
    <Box
      width={"80%"}
      height={"60%"}
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      flexDirection={"column"}
    >
      <Typography variant="h2">Store Address</Typography>
      <Typography>Required Field *</Typography>
      {!checkPinCode ? (
        <PinCode setCheckPinCode={setCheckPinCode} setPinCode={setPinCode} />
      ) : (
        <Information handleNext={handleNext} data={pinCode.PostOffice} />
      )}
    </Box>
  );
};

export default Address;
