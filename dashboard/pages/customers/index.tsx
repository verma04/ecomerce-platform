import Customers from "@/components/customers/Customers";
import withAuth from "@/components/hoc/withAuth";
import React from "react";

const page = () => {
  return (
    <div>
      <Customers />
    </div>
  );
};

export default withAuth(page);
