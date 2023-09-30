import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SelectCategory from "./SelectCategory";
import CategoryDetails from "./CustomersDetails";
import CategoryImages from "./CategoryImages";
import { addSellerCategory } from "@/grapqhl/actions/category";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import Redirect from "@/comman/Redirect";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import toast from "react-hot-toast";

export default function AddCustomers() {
  const router = useRouter();
  const [add, { data, loading, error }] = addSellerCategory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    basic === "" ? console.log("err") : setActiveStep(step);
  };

  const handleComplete = () => {
    add({});
  };

  const [basic, setBasic] = React.useState({});
  const [address, setAddress] = React.useState({});
  const steps = [
    {
      title: "Customers Details",
      components: (
        <SelectCategory
          basic={basic}
          setBasic={setBasic}
          handleNext={handleNext}
        />
      ),
    },
    {
      title: "Customers Address",
      components: (
        <CategoryDetails
          basic={basic}
          address={address}
          setAddress={setAddress}
        />
      ),
    },
  ];

  console.log(basic, address);
  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"}>
      <Box sx={{ width: "70%", padding: "2rem", backgroundColor: "white" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label.title}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box>
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {steps[activeStep].components}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {activeStep !== 0 && (
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
              )}

              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
        </Box>
      </Box>
    </Box>
  );
}
