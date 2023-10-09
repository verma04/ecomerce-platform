import Dashboard from "@/components/dashboard/Dashboard";
import withAuth from "@/components/hoc/withAuth";
import Kyc from "@/components/kyc";

import React from "react";

const pages = () => {
  return <Dashboard />;
};

export default withAuth(pages);
