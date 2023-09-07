import * as React from "react";

import AuthLayout from "../Layout/AuthLayout";
import GstDetails from "./GstDetails";
import Address from "./Address";
import BankDetails from "./bankDetails";
import SuppleirDetails from "./SuppleirDetails";
import { Box, Step, StepButton, Stepper } from "@mui/material";
import useSound from "use-sound";

export default function KYC() {
  const [play] = useSound("/audio/stepComplete.mp3");
  const [activeStep, setActiveStep] = React.useState(0);

  const nextStep = () => {
    play();
    setActiveStep(activeStep + 1);
  };

  const steps = [
    {
      name: "GST DETAILS",
      isCompleted: false,
      component: <GstDetails nextStep={nextStep} />,
    },

    {
      name: "Pickup Address",
      isCompleted: false,
      component: <Address nextStep={nextStep} />,
    },
    {
      name: "BANK DETAILS",
      isCompleted: false,
      component: <BankDetails nextStep={nextStep} />,
    },
    {
      name: "SUPPLIER DETAILS",
      isCompleted: false,
      component: <SuppleirDetails nextStep={nextStep} />,
    },
  ];

  return (
    <AuthLayout width="60rem">
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        marginBottom={"3rem"}
        height={"30rem"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Stepper
          sx={{ width: "90%", height: "10%" }}
          nonLinear
          activeStep={activeStep}
        >
          {steps.map((label, index) => (
            <Step key={index} completed={label.isCompleted}>
              <StepButton
                sx={{ textTransform: "uppercase", fontSize: "0.7rem" }}
                color="inherit"
              >
                {label.name}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <Box
          height={"90%"}
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {steps[activeStep].component}
        </Box>
      </Box>
    </AuthLayout>
  );
}
