import React from "react";

import clsx from "clsx";
import { makeStyles, createStyles } from "@mui/styles";
import { Autorenew } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  refresh: {
    cursor: "pointer",
    margin: "auto",
    "&.spin": {
      animation: "$spin 1s 1",
      pointerEvents: "none",
    },
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

function Refresh({ refresh }) {
  const [spin, setSpin] = React.useState(false);
  const classes = useStyles();

  const refreshCanvas = () => {
    refresh();
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 1000);
  };

  return (
    <Autorenew
      className={clsx({
        [classes.refresh]: true,
        spin: spin,
      })}
      onClick={refreshCanvas}
      spin={360}
    />
  );
}

export default Refresh;
