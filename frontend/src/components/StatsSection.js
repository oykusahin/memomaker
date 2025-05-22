import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DevicesIcon from "@mui/icons-material/Devices";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BackupIcon from "@mui/icons-material/Backup";

const StatsSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: "#f8f9fa" }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Top Statistics Row */}
        {[
          { value: "300+", label: "Coded Elements", icon: <CodeIcon color="primary" /> },
          { value: "100+", label: "Design Blocks", icon: <ViewModuleIcon color="primary" /> },
          { value: "41", label: "Pages", icon: <InsertDriveFileIcon color="primary" /> },
        ].map((stat, index) => (
          <Grid item xs={12} sm={4} key={index} textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              {stat.value}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {stat.label}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} mt={6}>
        {/* Left Large Blue Box */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: "100%",
              bgcolor: "#2196f3",
              borderRadius: 3,
              p: 4,
              color: "#fff",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: 240,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6" fontWeight={600}>
              Feel the Material Kit
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              All the MUI components redesigned to match modern aesthetic and usability.
            </Typography>
          </Box>
        </Grid>

        {/* Right-side Features Grid */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {[
              {
                title: "Full Documentation",
                desc: "Built by developers for developers.",
                icon: <MenuBookIcon color="primary" />,
              },
              {
                title: "MUI Ready",
                desc: "Built with the world's most popular UI library.",
                icon: <DevicesIcon color="primary" />,
              },
              {
                title: "Save Time & Money",
                desc: "Start fast with prebuilt design templates.",
                icon: <AccessTimeIcon color="primary" />,
              },
              {
                title: "Fully Responsive",
                desc: "Looks great on any screen size.",
                icon: <BackupIcon color="primary" />,
              },
            ].map((item, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  {item.icon}
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatsSection;
