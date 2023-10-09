import { getAllActiveWareHouse } from "@/grapqhl/actions/warehouse";
import { inventory, inventoryProps } from "@/types/type";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const Inventory = ({ inventory, setInventory, handleNext }: inventoryProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<inventory>();
  const onSubmit: SubmitHandler<inventory> = (data) => {
    setInventory({
      quantity: Number(data.quantity),
      sku: data.sku,
      warehouse: data.warehouse,
    });
    handleNext();
  };

  const { data, loading } = getAllActiveWareHouse();
  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Box
        width={"90%"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="2rem"
        flexWrap={"wrap"}
      >
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="Quantity"
          sx={{ fontSize: "2rem", width: "48%" }}
          placeholder="eg1"
          {...register("quantity", {
            required: "required",
          })}
          defaultValue={inventory.quantity}
          helperText={errors.quantity && errors.quantity.message}
          error={errors.quantity && true}
        />
        {!loading && (
          <FormControl sx={{ width: "48%" }}>
            <TextField
              select
              fullWidth
              inputProps={register("warehouse", {
                required: "required",
              })}
              label="Ware house"
              error={errors.warehouse && true}
              defaultValue={inventory.warehouse}
              helperText={errors.warehouse?.message}
            >
              {data?.getAllActiveWareHouse.map((t: any, key: any) => (
                <MenuItem key={key} value={t.id}>
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
            </TextField>
          </FormControl>
        )}
        <Box marginTop={"2rem"} width={"100%"}>
          <TextField
            fullWidth
            id="outlined-error-helper-text"
            label="SUKU ID"
            sx={{ fontSize: "2rem" }}
            placeholder="eg1"
            {...register("sku", {
              required: "required",
            })}
            defaultValue={inventory.sku}
            helperText={errors.sku && errors.sku.message}
            error={errors.sku && true}
          />
        </Box>
      </Box>
      <Box
        position={"absolute"}
        width={"60%"}
        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
      >
        <Box sx={{ flex: "1 1 auto" }} />

        <Button type="submit" sx={{ mr: 1 }}>
          Next
        </Button>
      </Box>
    </form>
  );
};

export default Inventory;
