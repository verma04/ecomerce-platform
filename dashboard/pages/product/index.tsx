import AddCategory from "@/components/category/addCategpry/AddCategory";
import withAuth from "@/components/hoc/withAuth";
import Product from "@/components/product/Product";
import React from "react";

const page = () => {
  return (
    <>
      <Product />
    </>
  );
};

export default withAuth(page);
