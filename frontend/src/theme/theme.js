// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      main: "#4E6688"
    },
    primary: {
      main: "#332D56",
      light: "#665AAC", 
      dark: "#1C1931",
      contrastText: "#C1BCE3"
    },
    secondary: {
        main: "#71C0BB",
        light: "#A3FFF9", 
        dark: "#487A77"
    },
  },
  typography: {
    fontFamily: "'Roboto Slab', serif",
  },
});

export default theme;
