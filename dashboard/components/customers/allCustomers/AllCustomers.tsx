import FormLayout from "@/components/comman/Form/FormLayout";
import { getSellerCategory } from "@/grapqhl/actions/category";
import { Box } from "@mui/material";
import React from "react";
import List from "./List";
import LoadingTable from "@/Loading/LoadingTable";
import { getAllCustomer } from "@/grapqhl/actions/customer";

const AllCustomers = () => {
  const { data, loading, refetch } = getAllCustomer();
  return (
    <Box width="100%">
      {loading && <LoadingTable />}
      {!loading && <List data={data?.getAllCustomer} refresh={refetch} />}
    </Box>
  );
};

export default AllCustomers;
