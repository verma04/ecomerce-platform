import LoadingTable from "@/Loading/LoadingTable";
import withAuth from "@/components/hoc/withAuth";
import AddPromotion from "@/components/promotions/addPromotions/AddPromotion";
import Warehouse from "@/components/wareHouse/allWareHouse/Warehouse";
import { Box } from "@mui/material";
import React from "react";

const index = () => {
  return <AddPromotion />;
};

export default withAuth(index);
