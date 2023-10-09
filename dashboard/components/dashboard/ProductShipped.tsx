import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import { Box, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

const labels = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
  "Category 6",
];

export const data = {
  labels,
  datasets: [
    {
      label: "",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const ProductShipped = () => {
  return (
    <Box
      width={"49%"}
      sx={{
        border: "1px solid #E1E7EC",
        background: "white",
        borderRadius: "10px",
      }}
      display={"flex"}
      flexDirection={"column"}
      padding={"2rem"}
    >
      <Typography marginBottom={"1rem"} variant="h2">
        Product Shipped
      </Typography>
      <Bar options={options} data={data} />
    </Box>
  );
};

export default ProductShipped;
