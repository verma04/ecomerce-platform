import * as React from "react";
import Switch from "@mui/material/Switch";

export default function SwitchToggle({ status, id }) {
  const [checked, setChecked] = React.useState(status);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
