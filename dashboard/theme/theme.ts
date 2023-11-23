import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {},
  typography: {
    fontFamily: "Tajawal",

    fontSize: 15,

    h1: {
      fontSize: "2rem",
      fontWeight: "600",
    },

    h2: {
      fontSize: "1.5rem",
      fontWeight: "600",
    },
    h4: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "0.9rem",
      fontWeight: 800,
    },
    h5: {
      fontSize: "0.8rem",
      fontWeight: 800,
    },
    h6: {
      fontSize: "0.7rem",
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      light: "#0B2884",
      main: "#FF9D23",
      dark: "#97978D",
      contrastText: "#fff",
    },
    secondary: {
      light: "#0B2884",
      main: "#FF9D23",
      dark: "#97978D",
      contrastText: "#000",
    },
  },
});
