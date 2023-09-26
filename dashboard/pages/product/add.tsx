import AddCategory from "@/components/category/addCategpry/AddCategory";
import withAuth from "@/components/hoc/withAuth";
import AddProduct from "@/components/product/addProduct/AddProduct";
import React from "react";

const page = () => {
  return <AddProduct />;
};

export default withAuth(page);
