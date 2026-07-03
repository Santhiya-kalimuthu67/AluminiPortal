import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Stack,
  CircularProgress
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchAluminiDashboard } from "../api/dashboard.service";
import toast from "react-hot-toast";

export default function AlumniDashboard() {
  const [data, setData] = useState(null);

  const onLoad = async () => {
    try {
      const response = await fetchAluminiDashboard();
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);
const MotionCard = motion.create(Card);

  if (!data) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#0f172a"
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }


  return (
   <Box
    sx={{
      minHeight: "100vh",
      p: { xs: 3, md: 5 },
      background:
        "radial-gradient(circle at 10% 20%,#6366f125,transparent 40%), radial-gradient(circle at 90% 0%,#8b5cf620,transparent 35%), #0f172a"
    }}
  >
    {/* Header */}
    <Box mb={6}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          background:
            "linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Welcome back 👋
      </Typography>

      <Typography sx={{ color: "#f4f5f8", mt: 1 }}>
        Your experience is shaping future careers.
      </Typography>
    </Box>

    <Grid container spacing={4}>

      {/* Profile Strength */}
      <Grid item xs={12} md={4}>
        <MotionCard
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.25 }}
          sx={cardStyle}
        >
          <CardContent>
            <Typography sx={titleStyle}>
              Profile Strength
            </Typography>

            <Typography
              variant="h3"
              sx={{ color: "#fff", fontWeight: 800 }}
            >
              {data.profileCompletion}%
            </Typography>

            <LinearProgress
              value={data.profileCompletion}
              variant="determinate"
              sx={progressStyle}
            />

            <Button variant="contained" sx={gradientBtn}>
              Update Profile
            </Button>
          </CardContent>
        </MotionCard>
      </Grid>

      {/* Jobs */}
      <Grid item xs={12} md={4}>
        <MotionCard
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.25 }}
          sx={cardStyle}
        >
          <CardContent>
            <Typography sx={titleStyle}>
              Jobs & Internships
            </Typography>

            <Typography
              variant="h2"
              sx={{ color: "#fff", fontWeight: 800 }}
            >
              {data.jobsCount}
            </Typography>

            <Typography sx={{ color: "#f0f2f5" }}>
              Opportunities posted
            </Typography>
          </CardContent>
        </MotionCard>
      </Grid>

      {/* Applicants */}
      <Grid item xs={12} md={4}>
        <MotionCard
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.25 }}
          sx={cardStyle}
        >
          <CardContent>
            <Typography sx={titleStyle}>
              Applicants
            </Typography>

            <Typography
              variant="h2"
              sx={{ color: "#fff", fontWeight: 800 }}
            >
              {data.totalApplicants}
            </Typography>

            <Typography sx={{ color: "#f0f2f4" }}>
              Students applied
            </Typography>
          </CardContent>
        </MotionCard>
      </Grid>

      {/* Hiring Activity */}
      <Grid item xs={12} md={6}>
        <MotionCard
          whileHover={{ y: -8 }}
          transition={{ duration: 0.25 }}
          sx={cardStyle}
        >
          <CardContent>
            <Typography sx={titleStyle}>
              Hiring Activity
            </Typography>

            <Typography sx={{ color: "#eff1f5", mt: 2 }}>
              Applications Reviewed
            </Typography>

            <LinearProgress
              value={
                data.totalApplicants
                  ? (data.reviewed /
                      data.totalApplicants) *
                    100
                  : 0
              }
              variant="determinate"
              sx={progressStyle}
            />

            <Typography sx={{ color: "#e6ebf3", mt: 3 }}>
              Candidates Shortlisted
            </Typography>

            <LinearProgress
              value={
                data.totalApplicants
                  ? (data.shortlisted /
                      data.totalApplicants) *
                    100
                  : 0
              }
              variant="determinate"
              sx={progressStyle}
            />
          </CardContent>
        </MotionCard>
      </Grid>

      {/* Mentorship */}
      <Grid item xs={12} md={6}>
        <MotionCard
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.25 }}
          sx={cardStyle}
        >
          <CardContent>
            <Typography sx={titleStyle}>
              Mentorship Impact
            </Typography>

            <Typography
              variant="h2"
              sx={{ color: "#fff", fontWeight: 800 }}
            >
              {data.mentorshipCount}
            </Typography>

            <Typography sx={{ color: "#edf1f7" }}>
              Active mentees
            </Typography>
          </CardContent>
        </MotionCard>
      </Grid>

    </Grid>
  </Box>
  );
}

/* 🎨 Modern Styles */

const cardStyle = {
  bgcolor: "#1e293b",
  borderRadius: 4,
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  height: "100%"
};

const titleStyle = {
  color: "#94a3b8",
  fontWeight: 600,
  mb: 2,
  fontSize: "0.9rem",
  letterSpacing: 1
};

const gradientBtn = {
  mt: 3,
  borderRadius: 3,
  background:
    "linear-gradient(90deg,#6366f1,#8b5cf6)",
  fontWeight: 600,
  "&:hover": {
    background:
      "linear-gradient(90deg,#4f46e5,#7c3aed)"
  }
};

const progressStyle = {
  mt: 1,
  height: 8,
  borderRadius: 5,
  backgroundColor: "#0f172a",
  "& .MuiLinearProgress-bar": {
    background:
      "linear-gradient(90deg,#22d3ee,#3b82f6)"
  }
};
