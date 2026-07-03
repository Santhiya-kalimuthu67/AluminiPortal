import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  ThemeProvider,
  createTheme
} from "@mui/material";
import api from '../api/api.axios'
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff" }
  }
});

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  const loadDashboard = async () => {
    const { data } = await api.get("/dashboard/admin");
    setData(data);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!data)
    return (
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "background.default",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );

  const cards = [
    { title: "Pending Approvals", value: data.pendingUsers },
    { title: "Total Students", value: data.totalStudents },
    { title: "Total Alumni", value: data.totalAlumni },
    { title: "Webinars Hosted", value: data.totalWebinars },
    { title: "Active Mentorships", value: data.activeMentorships }
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        p={4}
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          color:"lightgrey"
        }}
      >
        <Typography variant="h4" mb={4}>
          Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "background.paper",
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)"
                  }
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    {card.title}
                  </Typography>
                  <Typography variant="h4" mt={1}>
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Insights Section */}
        <Box mt={6}>
          <Typography variant="h6" gutterBottom>
            System Insights
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • {data.pendingUsers} users waiting for approval  
            • Student-to-alumni ratio:{" "}
            {data.totalAlumni > 0
              ? Math.round(data.totalStudents / data.totalAlumni)
              : 0}
            :1  
            • Engagement driven by {data.totalWebinars} webinars
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
