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
import { green, red } from "@mui/material/colors";
import ChangePrimaryWareHouse from "./ChangePrimaryWareHouse";
import Router from "next/router";
import { useRouter } from "next/navigation";
//defining columns outside of the component is fine, is stable
const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: "wareHouseName",
    header: "Ware House Name",
    size: 50,
  },
  {
    accessorKey: "addressLine1",
    header: "Address Line 2",

    size: 50,
  },
  {
    accessorKey: "addressLine2",
    header: "AddressLine 2",
    size: 50,
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
    size: 50,
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
    size: 50,
  },

  {
    accessorKey: "pinCode",
    header: "pinCode",
    size: 50,
  },
  {
    accessorKey: "state",
    header: "State",
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const set = data.map((t: any) => ({
    addressLine1: t.addressLine1,
    addressLine2: t.addressLine2,
    city: t.city,
    contactPerson: t.contactPerson,
    gstIn: t.gstIn,
    id: t.id,
    mobileNumber: t.mobileNumber,
    pinCode: t.pinCode,
    state: t.state,
    wareHouseName: (
      <>
        {t.wareHouseName}
        {t.isPrimary && (
          <Box
            color={green[700]}
            bgcolor={green[100]}
            sx={{
              textTransform: "uppercase",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              pt: "0.2rem",
              width: "4rem",
            }}
          >
            primary
          </Box>
        )}
      </>
    ),
    isPrimary: t.isPrimary,
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
            onClick={handleClickOpen}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Change Primary Address
          </Button>

          <ChangePrimaryWareHouse handleClose={handleClose} open={open} />

          <Button
            onClick={() => router.push("/ware-house/add")}
            startIcon={<AddBoxIcon />}
            variant="contained"
          >
            Add Warehouse
          </Button>
        </Box>
      )}
    />
  );
};

export default List;
