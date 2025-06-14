import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DevicesIcon from "@mui/icons-material/Devices";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BackupIcon from "@mui/icons-material/Backup";
import { useTheme } from "@mui/material/styles";

const stats = [
  {
    value: "300+",
    label: "Coded Elements",
    icon: <CodeIcon color="primary" sx={{ fontSize: 38, mb: 1 }} />,
  },
  {
    value: "100+",
    label: "Design Blocks",
    icon: <ViewModuleIcon color="primary" sx={{ fontSize: 38, mb: 1 }} />,
  },
  {
    value: "41",
    label: "Pages",
    icon: <InsertDriveFileIcon color="primary" sx={{ fontSize: 38, mb: 1 }} />,
  },
];

const highlights = [
  {
    title: "Full Documentation",
    desc: "Built by developers for developers.",
    icon: <MenuBookIcon color="primary" sx={{ fontSize: 32 }} />,
  },
  {
    title: "MUI Ready",
    desc: "Built with the world's most popular UI library.",
    icon: <DevicesIcon color="primary" sx={{ fontSize: 32 }} />,
  },
  {
    title: "Save Time & Money",
    desc: "Start fast with prebuilt design templates.",
    icon: <AccessTimeIcon color="primary" sx={{ fontSize: 32 }} />,
  },
];

const StatsSection = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={4}
      sx={{
        px: { xs: 2, sm: 6 },
        py: { xs: 5, sm: 8 },
        borderRadius: 4,
        backgroundColor: "#fff",
        maxWidth: "1300px",
        margin: "0 auto",
      }}>
      {/* Highlights Grid */}
      <Grid container spacing={3} mt={2}>
        {highlights.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "#f8f9fa",
                borderRadius: 2,
                height: "100%",
                textAlign: "center",
              }}>
              {item.icon}
              <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 1 }}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}>
                {item.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default StatsSection;
