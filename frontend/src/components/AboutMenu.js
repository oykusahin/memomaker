import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Button,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  Box,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={8}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 8,
    marginTop: theme.spacing(1),
    minWidth: 210,
    color: theme.palette.text.primary,
    boxShadow:
      "0 4px 24px 0 rgba(31, 38, 135, 0.10), 0 1.5px 4px 0 rgba(31, 38, 135, 0.08)",
    background: "#fff",
    border: `1.5px solid ${theme.palette.primary.light}`,
    "& .MuiMenu-list": {
      padding: "8px 0",
    },
    "& .MuiMenuItem-root": {
      borderRadius: 6,
      margin: "0 8px",
      transition: "background 0.15s",
      "& .MuiSvgIcon-root": {
        fontSize: 22,
        color: theme.palette.primary.main,
        marginRight: theme.spacing(2),
      },
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.light, 0.13),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, 0.18),
      },
    },
  },
}));

export default function AboutMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  return (
    <Box>
      <Button
        id="about-button"
        aria-controls={open ? "about-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        color="secondary"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          fontWeight: 700,
          borderRadius: 3,
          px: 3,
          bgcolor: "secondary.main",
          color: "#fff",
          boxShadow: 2,
          "&:hover": {
            bgcolor: "secondary.dark",
          },
        }}>
        About
      </Button>
      <StyledMenu
        id="about-menu"
        MenuListProps={{
          "aria-labelledby": "about-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}>
        <MenuItem onClick={() => handleClose("/about")} disableRipple>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <Typography variant="subtitle1" fontWeight={600}>
            About Us
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleClose("/team")} disableRipple>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <Typography variant="subtitle1" fontWeight={600}>
            Team
          </Typography>
        </MenuItem>
        <Divider sx={{ my: 1, mx: 2 }} />
        <MenuItem onClick={() => handleClose("/privacy-policy")} disableRipple>
          <ListItemIcon>
            <GppMaybeIcon />
          </ListItemIcon>
          <Typography variant="subtitle1" fontWeight={600}>
            Data Privacy
          </Typography>
        </MenuItem>
      </StyledMenu>
    </Box>
  );
}
