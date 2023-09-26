import FormLayout from "@/components/comman/Form/FormLayout";
import { getSellerProduct } from "@/grapqhl/actions/product";
import { Box } from "@mui/material";
import React from "react";
import List from "./List";

const AllCategory = () => {
  const { data, loading, refetch, error } = getSellerProduct();

  return (
    <Box width="100%">
      {!loading && <List data={data?.getSellerProduct} refresh={refetch} />}
    </Box>
  );
};

export default AllCategory;
