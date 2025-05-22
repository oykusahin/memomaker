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
        main: "#4E6688",
        light: "#82ACE8", 
        dark: "#2C394D",
        contrastText: "#C3DAFA"
    },
  },
  typography: {
    fontFamily: "'Roboto Slab', serif",
  },
});

export default theme;
