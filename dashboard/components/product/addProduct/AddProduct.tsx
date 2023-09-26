import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProductInformation from "./ProductInformation";
import CategoryDetails from "./CategoryDetails";
import Variant from "./Variant/Variant";
import { addSellerCategory } from "@/grapqhl/actions/category";

import { useRouter } from "next/navigation";
import { image, informationProduct, inventory } from "@/types/type";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import toast from "react-hot-toast";
import Inventory from "./Inventory";
import Preview from "./Preview";

export default function AddProduct() {
  const router = useRouter();
  const [add, { data, loading, error }] = addSellerCategory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const [variant, setVariant] = React.useState([]);
  const [variantGenerated, setVariantGenerated] = React.useState<
    generatedVariant[]
  >([]);

  const [img, setImg] = React.useState<image[]>([]);

  const [productInformation, setProductInformation] =
    React.useState<informationProduct>({
      productName: "",
      category: "",
      price: null,
      discountedPrice: null,
      productPerUnit: "",
      unit: "",
    });

  const [inventory, setInventory] = React.useState<inventory>({
    quantity: "",
    warehouse: "",
    sku: "",
  });

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
    setActiveStep(step);
  };

  const steps = [
    {
      title: "Product Information",
      components: (
        <ProductInformation
          handleNext={handleNext}
          productInformation={productInformation}
          setProductInformation={setProductInformation}
        />
      ),
    },
    {
      title: "Product Media",
      components: (
        <CategoryDetails img={img} setImg={setImg} handleNext={handleNext} />
      ),
    },

    {
      title: "Inventory",
      components: (
        <Inventory
          inventory={inventory}
          setInventory={setInventory}
          handleNext={handleNext}
        />
      ),
    },

    {
      title: "Variants",
      components: (
        <Variant
          productInformation={productInformation}
          inventory={inventory}
          variant={variant}
          setVariant={setVariant}
          variantGenerated={variantGenerated}
          setVariantGenerated={setVariantGenerated}
          handleNext={handleNext}
        />
      ),
    },
    {
      title: "Preview",
      components: (
        <Preview
          productInformation={productInformation}
          inventory={inventory}
          variantGenerated={variantGenerated}
          variant={variant}
          img={img}
        />
      ),
    },
  ];

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
    <Box width={"100%"} display={"flex"} justifyContent={"center"}>
      <Box sx={{ width: "80%", padding: "2rem", backgroundColor: "white" }}>
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
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
        </Box>
      </Box>
    </Box>
  );
}
