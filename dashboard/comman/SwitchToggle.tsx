import * as React from "react";
import Switch from "@mui/material/Switch";
import toast from "react-hot-toast";
import { Box } from "@mui/material";
import { green, red } from "@mui/material/colors";

export default function SwitchToggle({ status, id, change, data }) {
  const [checked, setChecked] = React.useState(status);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    change({
      variables: {
        id,
        status: event.target.checked,
      },
    });
  };

  if (data) {
    toast.success(`Product is set to ${data.isActive ? "active" : "hidden"}`, {
      id: "ssd",
    });
  }

  return (
    <Box display={"flex"} alignItems={"center"}>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Box fontWeight={600} color={status ? green[900] : red[900]}>
        {status ? "Active" : "hidden"}
      </Box>
    </Box>
  );
}
