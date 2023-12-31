import FormLayout from "@/components/comman/Form/FormLayout";
import { getSellerCategory } from "@/grapqhl/actions/category";
import { Box } from "@mui/material";
import React from "react";
import List from "./List";
import LoadingTable from "@/Loading/LoadingTable";

const AllCategory = () => {
  const { data, loading, refetch } = getSellerCategory();
  return (
    <Box width="100%">
      {loading && <LoadingTable />}
      {!loading && <List data={data?.getSellerCategory} refresh={refetch} />}
    </Box>
  );
};

export default AllCategory;
