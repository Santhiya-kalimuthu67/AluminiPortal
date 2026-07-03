import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  createTheme,
  ThemeProvider,
  useMediaQuery
} from "@mui/material";
import PostJob from "./PostJob";
import JobApplicants from "./JobApplicants";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f172a",
      paper: "#1e293b"
    },
    primary: {
      main: "#6366f1"
    },
    text: {
      primary: "#ffffff",
      secondary: "#cbd5e1" // light grey
    }
  }
});

export default function AlumniOpportunities() {
  const [tab, setTab] = useState(0);
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#0f172a,#1e293b)",
          px: { xs: 2, md: 4 },
          py: 4,
          color: "text.primary"
        }}
      >
        {/* Page Title */}
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
          sx={{ color: "text.primary" }}
        >
          Opportunities Management
        </Typography>

        {/* Tabs Wrapper */}
        <Box
          sx={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(14px)",
            borderRadius: 4,
            p: 1,
            mb: 4
          }}
        >
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 3,
                px: 3,
                minHeight: 42,
                color: "#cbd5e1", // light grey inactive
                transition: "all 0.3s ease"
              },
              "& .Mui-selected": {
                background:
                  "linear-gradient(90deg,#6366f1,#8b5cf6)",
                color: "#ffffff !important",
                boxShadow:
                  "0 4px 20px rgba(99,102,241,0.4)"
              },
              "& .MuiTabs-indicator": {
                display: "none"
              }
            }}
          >
            <Tab label="Post Opportunity" />
            <Tab label="Applicants" />
          </Tabs>
        </Box>

        {/* Content Panel */}
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 4,
            p: { xs: 2, md: 4 },
            boxShadow: "0 25px 70px rgba(0,0,0,0.45)",
            color: "text.secondary"
          }}
        >
          {tab === 0 && <PostJob />}
          {tab === 1 && <JobApplicants />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
