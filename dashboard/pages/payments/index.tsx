import withAuth from "@/components/hoc/withAuth";
import React from "react";

const index = () => {
  return <div>index</div>;
};

export default withAuth(index);
