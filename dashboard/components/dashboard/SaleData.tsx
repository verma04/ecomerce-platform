import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Category 1", "Category 2", "Category 3"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const SaleData = () => {
  return (
    <Box
      width={"50%"}
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
        Sale Data
      </Typography>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        gap={"1rem"}
      >
        <Box width={"50%"}>
          <Doughnut data={data} />
        </Box>

        <Box
          width={"50%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {data.labels.map((set, index) => (
            <Box
              display={"flex"}
              width={"90%"}
              justifyContent={"space-between"}
              marginBottom={"0.5rem"}
            >
              <Typography>{set}</Typography>
              <Typography>₹{data.datasets[0].data[index]}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SaleData;
