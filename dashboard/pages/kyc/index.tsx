"use client";
import KYC from "@/components/auth/KYC/KycSteps";
import withAuth from "@/components/hoc/withAuth";
import React from "react";

const page = () => {
  return <KYC />;
};

export default withAuth(page);
