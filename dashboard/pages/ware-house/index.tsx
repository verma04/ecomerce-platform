import withAuth from "@/components/hoc/withAuth";
import Warehouse from "@/components/wareHouse/allWareHouse/Warehouse";
import React from "react";

const index = () => {
  return <Warehouse />;
};

export default withAuth(index);
