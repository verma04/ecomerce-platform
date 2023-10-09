import { getCategorySelect } from "@/grapqhl/actions/category";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

const SelectCategory = ({
  category,
  setCategory,
  subCategory,
  setSubCategory,
}: any) => {
  const { data, loading, error } = getCategorySelect();

  console.log(data, error);
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleChange2 = (event: SelectChangeEvent) => {
    setSubCategory(event.target.value);
  };
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      {!loading && (
        <Box
          marginTop={"2rem"}
          width={"50%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              {data?.getCategorySelect.map((set: any, key: any) => (
                <MenuItem key={key} value={set.id}>
                  {set.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {category !== "" && (
        <Box
          marginTop={"2rem"}
          width={"50%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Sub Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={subCategory}
              label="Sub Category"
              onChange={handleChange2}
            >
              {data?.getCategorySelect
                .find((t: any) => t.id === category)
                .subCategory.map((set: any, key: any) => (
                  <MenuItem key={key} value={set.id}>
                    {set.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default SelectCategory;
