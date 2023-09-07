import * as React from "react";
import Box from "@mui/material/Box";
import KycStep from "./KycStep";
import { useTheme } from "@mui/material/styles";
import PersonalInformation from "./PersonalInformation";
import Store from "./Store";
import Address from "./Address/Address";
import Account from "./Account";
import Navbar from "./Navbar";

export default function Kyc() {
  const { palette } = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = (index: number) => {
    setActiveStep(index);
  };

  const steps = [
    {
      label: "Personal Information",
      description: `In the first step of the form, users will provide their personal information. This typically includes fields for their name, email address, phone number, and any other relevant personal details. This step is essential for establishing a user's identity and contact information, making it easier to communicate with them or provide personalized services in the future. Personal Information is a foundational part of many online forms and helps organizations tailor their interactions with users.`,
      component: <PersonalInformation handleNext={handleNext} />,
    },
    {
      label: "Store Information",
      description:
        "The second step of the form focuses on collecting information related to the store or business that the user is associated with or representing. This can include the store's name, type of business, business registration details, and any relevant identifiers. Store information is crucial for understanding the nature of the business and its specific needs or requirements.",
      component: <Store handleNext={handleNext} />,
    },
    {
      label: "Store Address",
      description: `In this step, users will provide the physical address or location details of the store or business. This information is important for logistical purposes, such as shipping, location-based services, and compliance with local regulations. Accurate store address details ensure that deliveries and communications are directed to the correct location.`,
      component: <Address handleNext={handleNext} />,
    },
    {
      label: "Bank Account",
      description: `The final step of the multi-step form focuses on gathering bank account information. This may include the bank name, account number, and routing number. Collecting bank account details is often necessary for payment processing, reimbursements, or other financial transactions. It's crucial to handle this information securely and in compliance with financial regulations to protect both the user and your organization.`,
      component: <Account />,
    },
  ];

  return (
    <Box
      width={"100%"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Navbar />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor={palette.primary.light}
        height={"100%"}
        width={"40%"}
      >
        <KycStep
          activeStep={activeStep}
          steps={steps}
          setActiveStep={setActiveStep}
        />
      </Box>
      <Box
        width={"60%"}
        height={"100%"}
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        {steps[activeStep].component}
      </Box>
    </Box>
  );
}
