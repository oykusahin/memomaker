import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import AboutMenu from "./AboutMenu";

const navLinks = [
  {
    label: "For Wedding",
    path: "/wedding",
    variant: "contained",
    color: "secondary",
  },
  {
    label: "Start Building",
    path: "/upload",
    variant: "contained",
    color: "primary",
  },
  { label: "Log In", path: "/login", variant: "outlined", color: "primary" },
];

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  return (
    <AppBar
      position="sticky"
      elevation={8}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bgcolor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        color: "#22223c",
        borderRadius: 0,
        zIndex: theme.zIndex.drawer + 1,
        px: { xs: 1, sm: 4 },
        boxShadow: "0 2px 16px 0 rgba(31,38,135,0.08)",
      }}>
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 72 }}>
        {/* Logo */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}>
          <Box
            component="img"
            src={logo}
            alt="Memomaker Logo"
            sx={{ height: 48, width: "auto", mr: 2 }}
          />
        </Box>

        {/* Desktop Navigation */}
        {!isMobile ? (
          <Box display="flex" alignItems="center" gap={2}>
            <AboutMenu />
            {navLinks.map((link) => (
              <Button
                key={link.label}
                color={link.color}
                variant={link.variant}
                onClick={() => navigate(link.path)}
                sx={{
                  fontWeight: 600,
                  px: 3,
                  borderRadius: 3,
                  boxShadow: link.variant === "contained" ? 2 : "none",
                }}>
                {link.label}
              </Button>
            ))}
          </Box>
        ) : (
          // Mobile Navigation
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ ml: 1 }}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                sx: { width: 220, pt: 2, bgcolor: "#fff" },
              }}>
              <List>
                <ListItem disablePadding>
                  <AboutMenu />
                </ListItem>
                {navLinks.map((link) => (
                  <ListItem key={link.label} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(link.path);
                        setDrawerOpen(false);
                      }}>
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
