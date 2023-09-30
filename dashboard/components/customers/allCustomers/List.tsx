import React from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here

import AddBoxIcon from "@mui/icons-material/AddBox";
import SwitchToggle from "@/comman/SwitchToggle";
import Refresh from "@/comman/Refresh";
import { useRouter } from "next/navigation";

//defining columns outside of the component is fine, is stable
const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "Name",

    size: 50,
  },

  {
    accessorKey: "location",
    header: "Location",
    size: 50,
  },
  {
    accessorKey: "order",
    header: "Order",
    size: 50,
  },

  {
    accessorKey: "amount",
    header: "Amount Spent",
    size: 50,
  },

  // {
  //   accessorKey: "lastName",
  //   header: "Last Name",
  //   size: 120,
  // },
  // {
  //   accessorKey: "company",
  //   header: "Company",
  //   size: 300,
  // },
  // {
  //   accessorKey: "city",
  //   header: "City",
  // },
  // {
  //   accessorKey: "country",
  //   header: "Country",
  //   size: 220,
  // },
];

const csvOptions = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

const List = ({ data, refresh }) => {
  const router = useRouter();

  const set = data?.map((t: any) => ({
    id: t.id,

    name: (
      <>
        {t.firstName} {t.lastName}
      </>
    ),
    amount: <>0.0</>,
    order: <>0</>,
    location: (
      <>
        {" "}
        {console.log(t)} {t?.address?.state}
      </>
    ),
  }));

  console.log(data);
  const handleExportRows = (rows: MRT_Row<Person>[]) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(set);
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={set}
      enableRowSelection
      positionToolbarAlertBanner="bottom"
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
        >
          <Box>
            <Refresh refresh={refresh} />
          </Box>

          <Button
            color="primary"
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export All Data
          </Button>
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export Page Rows
          </Button>

          {/* <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export Selected Rows
          </Button> */}

          <Button
            onClick={() => router.push("/customers/add")}
            startIcon={<AddBoxIcon />}
            variant="contained"
          >
            Add Customers
          </Button>
        </Box>
      )}
    />
  );
};

export default List;
