import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import { Box, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      display: true,
      text: "",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Category 1",
      data: labels.map(() =>
        faker.datatype.number({ min: 1000, max: 1000000 })
      ),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Category 2",
      data: labels.map(() =>
        faker.datatype.number({ min: 1000, max: 1000000 })
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Category 3",
      data: labels.map(() =>
        faker.datatype.number({ min: 1000, max: 1000000 })
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Category 4",
      data: labels.map(() =>
        faker.datatype.number({ min: 1000, max: 1000000 })
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Category 5",
      data: labels.map(() =>
        faker.datatype.number({ min: 1000, max: 1000000 })
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Revenue = () => {
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
        Revenue
      </Typography>
      <Line options={options} data={data} />
    </Box>
  );
};

export default Revenue;
