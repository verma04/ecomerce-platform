import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import variantDropDown from "./variantData";

const VariantPop = ({ addVariant }) => {
  const [address, setAdress] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAdress(event.target.value as string);
  };
  const [open, setOpen] = React.useState(false);
  console.log(variantDropDown);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submit = () => {
    addVariant(address);
    setOpen(false);
  };
  return (
    <>
      <Button
        sx={{ marginTop: "2rem" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add Variant
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Options"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormControl sx={{ marginTop: "2rem", width: "20rem" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Choose product unit
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={address}
                label="Choose product unit"
                onChange={handleChange}
              >
                {variantDropDown?.map((set: any) => (
                  <MenuItem value={set.name}>{set.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={submit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VariantPop;
