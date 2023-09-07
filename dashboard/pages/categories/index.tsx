import Category from "@/components/category/Category";
import withAuth from "@/components/hoc/withAuth";
import React from "react";

const page = () => {
  return (
    <div>
      <Category />
    </div>
  );
};

export default withAuth(page);
