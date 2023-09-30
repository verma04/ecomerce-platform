import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, FormControl, TextField } from "@mui/material";
import {
  InformationProduct,
  editVariant,
  productInformationProps,
} from "@/types/type";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploadLabelMulti from "@/comman/ImagePop/ImageUplaodLabelMulti";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const EditVariant = ({ data, variantGenerated, setVariantGenerated }) => {
  const [img, setImg] = React.useState([...data.img]);
  const [id, setId] = React.useState(data.id);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<editVariant>();
  const onSubmit: SubmitHandler<editVariant> = (fin) => {
    const set = {
      id: data.id,
      variant: data.variant,
      price: fin.price,
      stock: Number(fin.stock),
      discountedPrice: Number(fin.discountedPrice),
      img: img,
      sku: data.sku,
    };

    console.log(variantGenerated);

    const index = variantGenerated.findIndex((x) => x.id === data.id);

    variantGenerated[index] = set;

    setVariantGenerated([...variantGenerated]);
    setOpen(false);
  };
  return (
    <div>
      <Button
        sx={{ width: "5rem", height: "2.5rem", marginLeft: "2rem" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        <Button>Edit</Button>
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {data.stock} {data.id}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Box
                width={"90%"}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap={"wrap"}
              >
                <Box
                  display={"flex"}
                  width={"100%"}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                >
                  {img.map((set) => (
                    <img
                      style={{
                        width: "7rem",
                        height: "7rem",
                        objectFit: "cover",
                        padding: "1rem",
                        marginTop: "4rem",
                      }}
                      alt={`${process.env.NEXT_PUBLIC_IMG}${set?.url}`}
                      src={`${process.env.NEXT_PUBLIC_IMG}${set?.url}`}
                    />
                  ))}
                  <Box ml="2rem">
                    <ImageUploadLabelMulti
                      label="Product Images"
                      img={img}
                      setImage={setImg}
                    />
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  id="outlined-error-helper-text"
                  label="Sku"
                  defaultValue={data.sku}
                  sx={{ fontSize: "2rem", width: "100%", marginBottom: "2rem" }}
                  {...register("sku", {
                    required: "required",
                  })}
                  helperText={errors.sku && errors.sku.message}
                  error={errors.sku && true}
                />
                <TextField
                  fullWidth
                  id="outlined-error-helper-text"
                  label="Price"
                  sx={{ fontSize: "2rem", width: "100%", marginBottom: "2rem" }}
                  {...register("price", {
                    required: "required",
                  })}
                  defaultValue={data.price}
                  helperText={errors.price && errors.price.message}
                  error={errors.price && true}
                />
                <TextField
                  fullWidth
                  id="outlined-error-helper-text"
                  label="Discounted Price"
                  sx={{ fontSize: "2rem", width: "100%", marginBottom: "2rem" }}
                  {...register("discountedPrice", {
                    required: "required",
                  })}
                  defaultValue={data.discountedPrice}
                  helperText={
                    errors.discountedPrice && errors.discountedPrice.message
                  }
                  error={errors.discountedPrice && true}
                />
                <TextField
                  fullWidth
                  id="outlined-error-helper-text"
                  label="Stock"
                  sx={{ fontSize: "2rem", width: "100%", marginBottom: "2rem" }}
                  {...register("stock", {
                    required: "required",
                  })}
                  defaultValue={data.stock}
                  helperText={errors.stock && errors.stock.message}
                  error={errors.stock && true}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button autoFocus type="submit">
              Save changes
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
};

export default EditVariant;
