import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { SketchPicker } from "react-color";
import namedColors from "color-name-list";

import { GetColorName } from "hex-color-to-color-name";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ColorPicker = ({ open, setOpen, list, setVariant, data }) => {
  const [color, setColor] = React.useState("#ffffff");
  const [value, setValue] = React.useState("white");
  const handleChangeComplete = async (color) => {
    setColor(color.hex);
    setValue(GetColorName(color.hex));
  };
  const handleClose = () => {
    setOpen(false);
    onSubmit();
  };
  const onSubmit = async () => {
    const check = list.list.find((t) => t === color);

    if (!check) {
      const fin = {
        name: list.name,
        type: list.type,
        list: [
          ...list.list,
          {
            name: color,
            value,
          },
        ],
      };
      console.log(fin.list);

      const index = await data.findIndex((x) => x.id === list.id);

      data[index] = fin;
      setVariant([...data]);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Pick Color"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <SketchPicker
              color={color}
              onChangeComplete={handleChangeComplete}
            />
            <TextField
              fullWidth
              id="outlined-error-helper-text"
              size="small"
              value={value}
              sx={{ fontSize: "2rem", width: "100%", marginTop: "1rem" }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ColorPicker;
