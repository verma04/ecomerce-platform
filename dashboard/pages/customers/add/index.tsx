import AddCategory from "@/components/category/addCategpry/AddCategory";
import AddCustomers from "@/components/customers/AddCustomers/AddCustomers";
import withAuth from "@/components/hoc/withAuth";
import React from "react";

const page = () => {
  return <AddCustomers />;
};

export default withAuth(page);
