import { Box } from "@mui/material";
import React from "react";
import Order from "./Order";
import Help from "./Help";
import Revenue from "./Revenue";
import ProductShipped from "./ProductShipped";
import SaleData from "./SaleData";

const Dashboard = () => {
  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"}>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        gap={"1rem"}
        flexWrap={"wrap"}
      >
        <Order />

        <Help />
        <ProductShipped />
        <Revenue />
        <SaleData />
      </Box>
    </Box>
  );
};

export default Dashboard;
