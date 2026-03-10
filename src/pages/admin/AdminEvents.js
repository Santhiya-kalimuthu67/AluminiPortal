import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper
} from "@mui/material";
import CreateEvent from "../Alumini/CreateEvents";
import RegisteredUsers from "../Alumini/RegisteredUsers";
export default function AdminEvents() {
  const [tab, setTab] = useState(0);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0f172a",
        p: 4
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "#fff", fontWeight: 600, mb: 3 }}
      >
        Sessions & Events
      </Typography>

      <Paper
        sx={{
          bgcolor: "#1e293b",
          borderRadius: 3,
          overflow: "hidden"
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          textColor="inherit"
          sx={{
            borderBottom: "1px solid #334155",
            "& .MuiTab-root": {
              color: "#94a3b8",
              fontWeight: 500
            },
            "& .Mui-selected": {
              color: "#fff"
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#6366f1"
            }
          }}
        >
          <Tab label="Create Event" />
          <Tab label="Registered Users" />
        </Tabs>

        <Box sx={{ p: 4 }}>
          {tab === 0 && <CreateEvent />}
          {tab === 1 && <RegisteredUsers />}
        </Box>
      </Paper>
    </Box>
  );
}
