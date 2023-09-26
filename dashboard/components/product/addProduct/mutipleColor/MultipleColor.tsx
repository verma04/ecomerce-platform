import { Box, Button, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import nearestColor from "nearest-color";
import ColorPicker from "./ColorPicker";
import colorName from "@/utils/colorName";
const MultipleColor = ({ list, setVariant, data }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [value, setValue] = React.useState("");

  const deleteItem = (id) => {
    const filter = list.list.filter((t) => t !== id);

    const fin = {
      id: list.id,
      name: list?.name,
      type: list?.type,
      list: [...filter],
    };

    const index = data.findIndex((x) => x.id === list.id);

    data[index] = fin;
    setVariant([...data]);
  };

  return (
    <Box
      minHeight={"3.5rem"}
      border={"1px solid grey"}
      borderRadius={"2px"}
      width={"70%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      flexWrap={"wrap"}
    >
      {list?.list?.map((set) => (
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          padding={"0.5rem"}
          height={"2rem"}
          margin={"0.5rem"}
          borderRadius={"2rem"}
          bgcolor={"#f2f2f2"}
        >
          <Box
            width={"1rem"}
            height={"1rem"}
            borderRadius={"1rem"}
            bgcolor={set.name}
          ></Box>
          <Typography mt="0.2rem" pl="0.2rem" pr="0.2rem">
            {set.value}
          </Typography>
          <CloseIcon
            onClick={() => deleteItem(set)}
            sx={{ fontSize: "1rem", marginBottom: "0.2rem", cursor: "pointer" }}
          />
        </Box>
      ))}

      <Button sx={{ m: "0.5rem" }} variant="outlined" onClick={handleClickOpen}>
        Add Color
      </Button>
      <ColorPicker
        list={list}
        setVariant={setVariant}
        open={open}
        data={data}
        setOpen={setOpen}
      />
      <Box></Box>
    </Box>
  );
};

export default MultipleColor;
