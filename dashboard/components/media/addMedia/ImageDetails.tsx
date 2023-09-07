import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box } from "@mui/material";
import Form from "./Form";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageDetails({ open, setOpen, img, image }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {};
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box
              height={"25rem"}
              width={"35rem"}
              display={"flex"}
              justifyContent={"space-between"}
              margin={"0.5rem"}
            >
              <Box
                width={"15rem"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}
                position={"relative"}
              >
                <img
                  style={{ width: "90%", height: "90%", objectFit: "contain" }}
                  src={img}
                ></img>
              </Box>

              <Box
                width={"18rem"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}
                position={"relative"}
              >
                <Form handleClose={handleClose} image={image} />
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
