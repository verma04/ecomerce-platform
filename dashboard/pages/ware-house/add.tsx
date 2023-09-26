import withAuth from "@/components/hoc/withAuth";
import AddWareHouse from "@/components/wareHouse/add/AddWarehouse";
import React from "react";

const add = () => {
  return <AddWareHouse />;
};

export default withAuth(add);
