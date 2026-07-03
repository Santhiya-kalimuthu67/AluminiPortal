import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  Stack,
  Card,
  CardContent,
  Button,
  Grid,
  Select,
  MenuItem
} from "@mui/material";
import { motion } from "framer-motion";
import { getjobs } from "../api/job.service";
import { Outlet, useNavigate } from "react-router-dom";

const MotionCard = motion.create(Card);

export default function StudentJobs() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getjobs();
        if (res) setJobs(res);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || job.type === typeFilter;

      return job.isActive && matchesSearch && matchesType;
    });
  }, [search, typeFilter, jobs]);

  return (
    <>
      <Box sx={styles.page}>
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
          <Typography variant="h4" fontWeight={700} mb={4} color="white">
            Explore Opportunities 🚀
          </Typography>

          {/* Filters */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={5}>
            <TextField
              placeholder="Search role or company..."
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={styles.input}
              InputProps={{
                sx: { color: "white" }
              }}
            />

            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              sx={{ ...styles.input, minWidth: 180, color: "white" }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#1e293b",
                    color: "white"
                  }
                }
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Job">Jobs</MenuItem>
              <MenuItem value="Internship">Internships</MenuItem>
            </Select>
          </Stack>

          {/* Job Cards */}
          <Grid container spacing={4}>
            {filteredJobs.length === 0 && (
              <Typography color="gray">
                No matching opportunities found.
              </Typography>
            )}

            {filteredJobs.map((job, index) => (
              <Grid item xs={12} md={6} key={job._id}>
                <MotionCard
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  sx={styles.card}
                >
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={600} color="white">
                          {job.title}
                        </Typography>

                        <Chip
                          label={job.type}
                          sx={{
                            background:
                              job.type === "Job"
                                ? "#6366F1"
                                : "#10B981",
                            color: "white"
                          }}
                          size="small"
                        />
                      </Stack>

                      <Typography sx={{ opacity: 0.7, color: "white" }}>
                        {job.company}
                      </Typography>

                      <Typography variant="body2" sx={{ opacity: 0.8, color: "white" }}>
                        {job.description}
                      </Typography>

                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {job.skills.map((skill, i) => (
                          <motion.div key={i} whileHover={{ scale: 1.1 }}>
                            <Chip
                              label={skill}
                              size="small"
                              sx={{
                                background: "rgba(255,255,255,0.1)",
                                color: "white"
                              }}
                            />
                          </motion.div>
                        ))}
                      </Stack>

                      <Button
                        variant="contained"
                        sx={styles.button}
                        onClick={() =>
                          navigate(`/student/jobs/${job._id}`)
                        }
                      >
                        View Details
                      </Button>
                    </Stack>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Outlet />
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    py: 6,
    px: 3
  },

  card: {
    borderRadius: 4,
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
  },

  input: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: 3,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255,255,255,0.2)"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255,255,255,0.4)"
    },
    "& .MuiSelect-icon": {
      color: "white"
    }
  },

  button: {
    mt: 2,
    alignSelf: "flex-start",
    background: "linear-gradient(90deg,#6366F1,#8B5CF6)",
    borderRadius: 3,
    fontWeight: 600
  }
};
