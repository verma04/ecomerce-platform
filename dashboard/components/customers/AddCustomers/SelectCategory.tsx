import RichEditor from "@/comman/HtmlEditor";
import ImageUploadLabel from "@/comman/ImagePop/ImageUplaodLabel";
import FormLayout from "@/components/comman/Form/FormLayout";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import {
  addSellerCategory,
  getCategorySelect,
} from "@/grapqhl/actions/category";
import { Category, userType } from "@/types/type";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const CustomersDetails = ({ basic, setBasic, handleNext }) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<userType>();

  const onSubmit: SubmitHandler<userType> = (data) => {
    setBasic(data);
    handleNext();
  };

  const [img, setImage] = React.useState("");

  const { data } = getCategorySelect();

  return (
    <form
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        width={"100%"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="2rem"
        flexWrap={"wrap"}
      >
        <FormControl sx={{ width: "48%" }}>
          <TextField
            id="outlined-error-helper-text"
            label="First Name"
            sx={{ fontSize: "2rem", width: "100%" }}
            {...register("firstName", {
              required: "required",
            })}
            defaultValue={basic.firstName}
            helperText={errors.firstName && errors.firstName.message}
            error={errors.firstName && true}
          />
        </FormControl>
        <FormControl sx={{ width: "48%" }}>
          <TextField
            id="outlined-error-helper-text"
            label="LastName"
            sx={{ fontSize: "2rem", width: "100%" }}
            {...register("lastName", {
              required: "required",
            })}
            defaultValue={basic.lastName}
            helperText={errors.lastName && errors.lastName.message}
            error={errors.lastName && true}
          />
        </FormControl>
        <FormControl sx={{ width: "48%" }}>
          <TextField
            id="outlined-error-helper-text"
            label="Phone"
            sx={{ fontSize: "2rem", width: "100%", marginTop: "2rem" }}
            {...register("phone", {
              required: "required",

              minLength: 10,
              maxLength: 10,
            })}
            label="Phone*"
            type="number"
            defaultValue={basic.phone}
            helperText={errors.phone && errors.phone.message}
            error={errors.phone && true}
          />
        </FormControl>
        <FormControl sx={{ width: "48%" }}>
          <TextField
            id="outlined-error-helper-text"
            label="Email"
            sx={{ fontSize: "2rem", width: "100%", marginTop: "2rem" }}
            {...register("email", {
              required: "required",
            })}
            type="email"
            helperText={errors.email && errors.email.message}
            error={errors.email && true}
            defaultValue={basic.email}
          />
        </FormControl>
        <Box
          width={"100%"}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button type="submit" sx={{ mt: "2rem" }}>
            Next
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CustomersDetails;
