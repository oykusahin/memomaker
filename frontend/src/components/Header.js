import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="sticky"
      elevation={6}
      sx={{
        top: 16,
        left: { xs: 8, sm: 16 },
        right: { xs: 8, sm: 16 },
        bgcolor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        color: "#000",
        borderRadius: 5,
        zIndex: theme.zIndex.drawer + 1,
        px: { xs: 2, sm: 2 },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Box
            component="img"
            src={logo}
            alt="Memomaker Logo"
            sx={{ height: 75, sm: 2, pl: 2}}
          />
        </Box>

        {!isMobile && (
          <Box display="flex" gap={2}>
            <Button color="inherit" onClick={() => navigate("/about")}>
              About Us
            </Button>
            <Button color="inherit" onClick={() => navigate("/wedding")}>
              Wedding
            </Button>
            <Button variant="contained" onClick={() => navigate("/upload")}>
              Start Building
            </Button>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Log In
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
