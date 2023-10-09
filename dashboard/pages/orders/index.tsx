import Customers from "@/components/customers/Customers";
import withAuth from "@/components/hoc/withAuth";
import Orders from "@/components/orders/Orders";
import React from "react";

const page = () => {
  return (
    <div>
      <Orders />
    </div>
  );
};

export default withAuth(page);
