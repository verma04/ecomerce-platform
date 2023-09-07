import AddCategory from "@/components/category/addCategpry/AddCategory";
import withAuth from "@/components/hoc/withAuth";
import React from "react";

const page = () => {
  return <AddCategory />;
};

export default withAuth(page);
