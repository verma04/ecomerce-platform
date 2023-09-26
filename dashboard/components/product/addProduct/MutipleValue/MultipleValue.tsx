import { Box, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
const MultipleValue = ({ list, setVariant, data }) => {
  const [value, setValue] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (value !== "") {
      const check = list.list.find((t) => t.value === value);
      console.log(check);
      if (!check) {
        //   console.log(list);

        //   console.log(arr);
        const fin = {
          id: list.id,
          name: list.name,
          type: list.type,
          list: [
            ...list.list,
            {
              value,
            },
          ],
        };

        const index = await data.findIndex((x) => x.id === list.id);

        data[index] = fin;

        console.log(data);

        await setVariant([...data]);

        // setList([...list, value]);
        setValue("");
      }
    }
  };

  const deleteItem = (id) => {
    const filter = list.list.filter((t) => t.value !== id);

    const remove = data.filter((t) => t.id !== list.id);
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
      {list.list?.map((set) => (
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          padding={"0.5rem"}
          height={"2rem"}
          margin={"0.5rem"}
          bgcolor={"#f2f2f2"}
          borderRadius={"2rem"}
        >
          <Typography> {set.value}</Typography>{" "}
          <CloseIcon
            onClick={() => deleteItem(set.value)}
            sx={{ fontSize: "1rem", marginBottom: "0.2rem", cursor: "pointer" }}
          />
        </Box>
      ))}
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <input
          className="tag"
          style={{
            outline: "none",
            border: "none",
            maxWidth: "100%",
            padding: "0.5rem",
          }}
          placeholder="Enter to add value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
      </form>
    </Box>
  );
};

export default MultipleValue;
