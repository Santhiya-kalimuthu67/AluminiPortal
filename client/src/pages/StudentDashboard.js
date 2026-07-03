import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Avatar,
  Stack,
  Chip,
  CircularProgress,
  Skeleton
} from "@mui/material";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { fetchStudentDashboard } from "../api/dashboard.service";
import { getMyProfile } from "../api/profile.service";

const MotionCard = motion.create(Card);

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetchStudentDashboard();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <Box p={6}>
        <Skeleton variant="text" width={300} height={40} />
        <Skeleton variant="rectangular" height={200} sx={{ mt: 3 }} />
      </Box>
    );
  }

  const jobProgress =
    data?.jobsCount > 0
      ? (data?.jobsApplied / data?.jobsCount) * 100
      : 0;

  return (
    <Box sx={styles.page}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* HERO */}
        <MotionCard
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={styles.hero}
        >
          <Typography variant="h4" fontWeight={700}>
            Welcome back 👋
          </Typography>
          <Typography sx={{ opacity: 0.9 }}>
            Track growth. Unlock opportunities. Build momentum.
          </Typography>
        </MotionCard>

        <Grid container spacing={4}>
          {/* PROFILE */}
          <Grid item xs={12} md={4}>
            <MotionCard
              whileHover={{ scale: 1.03 }}
              sx={styles.card}
            >
              <CardContent>
                <Typography fontWeight={600}>
                  Profile Strength
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight={700}
                  mt={1}
                >
                  <CountUp
                    end={data?.profileCompletion || 0}
                    suffix="%"
                  />
                </Typography>

                <LinearProgress
                  value={data?.profileCompletion}
                  variant="determinate"
                  sx={styles.progress}
                />

                {data?.hasResume && (
                  <Chip
                    label="Resume Uploaded ✔"
                    size="small"
                    sx={styles.successChip}
                  />
                )}

                <Button sx={styles.ctaButton}>
                  Improve Profile
                </Button>
              </CardContent>
            </MotionCard>
          </Grid>

          {/* JOBS */}
          <Grid item xs={12} md={4}>
            <MotionCard
              whileHover={{ scale: 1.03 }}
              sx={styles.card}
            >
              <CardContent>
                <Typography fontWeight={600}>
                  Job Opportunities
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight={700}
                  mt={1}
                >
                  <CountUp
                    end={data?.jobsCount || 0}
                  />
                </Typography>

                <Typography sx={{ opacity: 0.7 }}>
                  Alumni-posted jobs
                </Typography>

                <LinearProgress
                  value={jobProgress}
                  variant="determinate"
                  sx={styles.progress}
                />

                <Button sx={styles.secondaryButton}>
                  View Jobs
                </Button>
              </CardContent>
            </MotionCard>
          </Grid>

          {/* MENTORSHIP */}
          <Grid item xs={12} md={4}>
            <MotionCard
              whileHover={{ scale: 1.03 }}
              sx={styles.card}
            >
              <CardContent>
                <Typography fontWeight={600}>
                  Mentorship
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight={700}
                  mt={1}
                >
                  <CountUp
                    end={data?.mentorshipCount || 0}
                  />
                </Typography>

                <Typography sx={{ opacity: 0.7 }}>
                  Active requests
                </Typography>

                <Button sx={styles.secondaryButton}>
                  Find Mentors
                </Button>
              </CardContent>
            </MotionCard>
          </Grid>

          {/* ALUMNI PREVIEW */}
          <Grid item xs={12}>
            <MotionCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              sx={styles.card}
            >
              <CardContent>
                <Typography
                  fontWeight={600}
                  mb={3}
                >
                  Alumni You Can Connect With
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  mb={3}
                >
                  {data?.alumniPreview?.map(
                    (alumni, index) => (
                      <motion.div
                        key={alumni._id}
                        whileHover={{
                          scale: 1.2,
                        }}
                        transition={{
                          type: "spring",
                        }}
                      >
                        <Avatar sx={styles.avatar}>
                          {alumni.name
                            .charAt(0)
                            .toUpperCase()}
                        </Avatar>
                      </motion.div>
                    )
                  )}
                </Stack>

                <Typography sx={{ opacity: 0.7 }}>
                  Professionals from leading companies ready to mentor.
                </Typography>

                <Button sx={styles.secondaryButton}>
                  View All Alumni
                </Button>
              </CardContent>
            </MotionCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b)",
    py: 6,
    px: 3,
    color: "white",
  },
  hero: {
    p: 5,
    mb: 5,
    borderRadius: 4,
    background:
      "linear-gradient(135deg,#6366F1,#8B5CF6)",
    color: "white",
  },
  card: {
    borderRadius: 4,
    background:
      "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    boxShadow:
      "0 8px 32px rgba(0,0,0,0.4)",
    color: "white",
  },
  progress: {
    height: 10,
    borderRadius: 5,
    mt: 2,
    mb: 2,
  },
  successChip: {
    background: "#10B981",
    color: "white",
    mb: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    background:
      "linear-gradient(90deg,#6366F1,#8B5CF6)",
    fontWeight: 600,
  },
  ctaButton: {
    mt: 2,
    background:
      "linear-gradient(90deg,#6366F1,#8B5CF6)",
    borderRadius: 3,
    fontWeight: 600,
    color: "white",
  },
  secondaryButton: {
    mt: 2,
    borderRadius: 3,
    fontWeight: 600,
    background:
      "rgba(255,255,255,0.15)",
    color: "white",
  },
};
