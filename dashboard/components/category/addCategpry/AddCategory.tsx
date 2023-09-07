import RichEditor from "@/comman/HtmlEditor";
import FormLayout from "@/components/comman/Form/FormLayout";
import { Box, InputLabel, TextField, Typography } from "@mui/material";
import React from "react";

const AddCategory = () => {
  return (
    <Box width="100%">
      <FormLayout buttonName="Add Category">
        <Typography variant="h2">Add Categery</Typography>
        <Typography>Required Field *</Typography>

        <Box marginTop={"2rem"} width={"100%"}>
          <TextField
            fullWidth
            id="outlined-error-helper-text"
            label="Category Name* "
            sx={{ fontSize: "2rem" }}
          />
        </Box>
        <Box marginTop={"2rem"} width={"100%"}>
          <InputLabel>Description</InputLabel>
          <RichEditor />
        </Box>
      </FormLayout>
    </Box>
  );
};

export default AddCategory;
