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
    accessorKey: "category",
    header: "Category",

    size: 50,
  },
  {
    accessorKey: "subCategory",
    header: "Sub Category",
    size: 50,
  },
  {
    accessorKey: "product",
    header: "Product",
    size: 50,
  },
  {
    accessorKey: "status",
    header: "Status",
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
  console.log(data);
  const set = data?.map((t: any) => ({
    id: t.id,
    status: <SwitchToggle status={t.status} />,
    category: t?.category?.title,
    subCategory: t?.subCategory?.title,
    sort: t?.sort,
    product: t?.product?.length,
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
            onClick={() => router.push("/categories/add")}
            startIcon={<AddBoxIcon />}
            variant="contained"
          >
            Add Category
          </Button>
        </Box>
      )}
    />
  );
};

export default List;
