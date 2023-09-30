import { getAllWareHouse } from "@/grapqhl/actions/warehouse";
import { Box } from "@mui/material";
import React from "react";
import List from "./List";
import LoadingTable from "@/Loading/LoadingTable";

const Warehouse = () => {
  const { data, loading, refetch } = getAllWareHouse();
  console.log(data);
  return (
    <Box width="100%">
      {loading && <LoadingTable />}
      {!loading && <List data={data?.getAllWareHouse} refresh={refetch} />}
    </Box>
  );
};

export default Warehouse;
