import React from "react";
import { AppBar, Toolbar, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Replace with your actual logo path

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="fixed"
      elevation={6}
      sx={{
        top: 16,
        left: { xs: 8, sm: 16 },
        right: { xs: 8, sm: 16 },
        bgcolor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        color: "#000",
        borderRadius: 3,
        transition: "all 0.3s ease-in-out",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Box
            component="img"
            src={logo}
            alt="Memomaker Logo"
            sx={{ height: 40, mr: 2 }}
          />
          <Typography variant="h6" fontWeight={600} noWrap>
            Memomaker
          </Typography>
        </Box>

        {/* Optional Nav */}
        {/* <Box>
          <Button color="inherit">Docs</Button>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
