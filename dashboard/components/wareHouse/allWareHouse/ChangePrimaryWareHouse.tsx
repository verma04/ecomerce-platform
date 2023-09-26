import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  changePrimaryWarehouse,
  getAllActiveWareHouse,
} from "@/grapqhl/actions/warehouse";
import { green } from "@mui/material/colors";
import { Typography } from "@mui/material";
import SuccessToast from "@/components/toast/SuccessToast";

const ChangePrimaryWareHouse = ({ open, handleClose }) => {
  const [address, setAdress] = React.useState("");
  const [edit, { data: data1 }] = changePrimaryWarehouse();

  const { data, loading } = getAllActiveWareHouse();
  const handleChange = (event: SelectChangeEvent) => {
    setAdress(event.target.value as string);
  };
  const onSubmit = () => {
    edit({
      variables: {
        id: address,
      },
    });
  };
  React.useEffect(() => {
    const find = data?.getAllActiveWareHouse.find((t) => t?.isPrimary === true);
    setAdress(find?.id);
  }, []);

  if (data && data.changePrimaryWarehouse) {
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Change WareHouse Address"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ width: "20rem" }}
          id="alert-dialog-description"
        >
          {!loading && (
            <FormControl sx={{ marginTop: "1rem" }} fullWidth>
              <InputLabel id="demo-simple-select-label">Address</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={address}
                label="Address"
                onChange={handleChange}
              >
                {data?.getAllActiveWareHouse.map((t) => (
                  <MenuItem value={t.id}>
                    <Typography>{t.wareHouseName}</Typography>
                    {t.isPrimary && (
                      <Box
                        color={green[700]}
                        bgcolor={green[100]}
                        sx={{
                          ml: "0.5rem",
                          textTransform: "uppercase",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          pt: "0.2rem",
                          width: "4.5rem",
                        }}
                      >
                        primary
                      </Box>
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={onSubmit} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePrimaryWareHouse;
