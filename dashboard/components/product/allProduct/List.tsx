import React from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here

import AddBoxIcon from "@mui/icons-material/AddBox";
import SwitchToggle from "@/comman/SwitchToggle";
import Refresh from "@/comman/Refresh";
import { useRouter } from "next/navigation";
import { changeProductStatus } from "@/grapqhl/actions/product";

//defining columns outside of the component is fine, is stable
const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: "img",
    header: "Product Image",

    size: 50,
  },
  {
    accessorKey: "productName",
    header: "Product Name",

    size: 50,
  },
  {
    accessorKey: "price",
    header: "Price",

    size: 50,
  },
  {
    accessorKey: "inventory",
    header: "Inventory",
    size: 50,
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    size: 50,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 50,
  },
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
  const [change, { data: data1, loading, error }] = changeProductStatus();
  const set = data?.map((t: any) => ({
    id: t.id,
    price: (
      <Box display={"flex"}>
        ₹{t?.productInformation?.discountedPrice}{" "}
        <Typography sx={{ textDecoration: "line-through" }} ml="0.5rem">
          ₹{t?.productInformation?.price}
        </Typography>
      </Box>
    ),
    status: (
      <SwitchToggle
        data={data1?.changeProductStatus}
        change={change}
        id={t.id}
        status={t.isActive}
      />
    ),
    inventory: (
      <>
        {t.productVariant.length === 0 ? (
          <> out of stock </>
        ) : (
          <>
            {t.productVariant.reduce(function (acc: any, obj: any) {
              return acc + obj.stock;
            }, 0)}{" "}
            in stock in {t.productVariant.length} variants
          </>
        )}
      </>
    ),
    productName: t?.productInformation?.productName,
    img: (
      <>
        {t?.img?.length > 0 && (
          <>
            <img
              style={{
                width: "7rem",
                height: "7rem",
                objectFit: "cover",
                padding: "1rem",
              }}
              alt={`${process.env.NEXT_PUBLIC_IMG}${t.img[0].alt}`}
              src={`${process.env.NEXT_PUBLIC_IMG}${t.img[0].url}`}
            />
          </>
        )}
      </>
    ),
    sort: t?.sort,
    warehouse: t?.inventory?.warehouse?.wareHouseName,
  }));

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
            onClick={() => router.push("/product/add")}
            startIcon={<AddBoxIcon />}
            variant="contained"
          >
            Add Product
          </Button>
        </Box>
      )}
    />
  );
};

export default List;
