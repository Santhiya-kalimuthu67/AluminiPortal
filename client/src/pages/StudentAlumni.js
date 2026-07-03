import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Pagination,
  Alert,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  fetchAluminiRecords,
  sendMentorReq,
} from "../api/alumini.service";

const MotionCard = motion.create(Card);



export default function StudentAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [filters, setFilters] = useState({
    skill: "",
    company: "",
    name: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  console.info("selectr",selectedAlumni)
  const [requestMessage, setRequestMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAlumni = async (currentPage = 1) => {
    try {
      setLoading(true);
      setError("");

      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value.trim() !== ""
        )
      );

      const res = await fetchAluminiRecords({
        ...cleanedFilters,
        page: currentPage,
        limit: 6,
      });

      setAlumni(res.data || []);
      setTotalPages(res.totalPages || 1);
      setPage(res.page || 1);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to load alumni records"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni(1);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    fetchAlumni(1);
  };

  const requestMentor = async () => {
    const payload={
        alumniId: selectedAlumni?.user?._id,
        message: requestMessage,
      }
    try {
      const response = await sendMentorReq(payload);

      setOpenDialog(false);
      setRequestMessage("");
      toast.success(response?.message);
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Failed to send request"
      );
    }
  };
console.info("alun",alumni)
  return (
    <Box sx={styles.page}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
          color="white"
        >
          Discover Mentors ✨
        </Typography>

        {/* FILTER SECTION */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          mb={5}
          sx={styles.glassSection}
        >
          <TextField
            label="Skill"
            value={filters.skill}
            onChange={(e) =>
              handleFilterChange("skill", e.target.value)
            }
            sx={styles.input}
            InputLabelProps={{ style: { color: "#aaa" } }}
          />

          <TextField
            label="Company"
            value={filters.company}
            onChange={(e) =>
              handleFilterChange("company", e.target.value)
            }
            sx={styles.input}
            InputLabelProps={{ style: { color: "#aaa" } }}
          />

          <TextField
            label="Name"
            value={filters.name}
            onChange={(e) =>
              handleFilterChange("name", e.target.value)
            }
            sx={styles.input}
            InputLabelProps={{ style: { color: "#aaa" } }}
          />

          <Button
            variant="contained"
            sx={styles.ctaButton}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {alumni.length === 0 ? (
              <Typography color="gray">
                No mentors found.
              </Typography>
            ) : (
              <Grid container spacing={4}>
                {alumni.map((a, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={a._id}
                  >
                    <MotionCard
                      initial={{
                        opacity: 0,
                        y: 40,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                      whileHover={{
                        scale: 1.03,
                      }}
                      sx={styles.card}
                    >
                      <CardContent>
                        <Box
                          display="flex"
                          alignItems="center"
                          mb={2}
                        >
                          <Avatar
                            src={`http://localhost:5000/${a.profilePhoto}`}
                            sx={styles.avatar}
                          />
                          <Box>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              color="white"
                            >
                              {a.user?.name}
                            </Typography>

                            <Typography
                              sx={{ opacity: 0.7 }}
                            >
                              {a.designation}
                            </Typography>

                            <Typography
                              sx={{
                                color: "#8B5CF6",
                              }}
                            >
                              {a.company}
                            </Typography>
                          </Box>
                        </Box>

                        <Chip
                          label={a.experience}
                          size="small"
                          sx={styles.expChip}
                        />

                        <Typography
                          variant="body2"
                          sx={{ opacity: 0.8, mt: 2 }}
                        >
                          {a.bio ||
                            "Helping students grow in tech."}
                        </Typography>

                        <Box mt={2}>
                          {a.skills?.map(
                            (skill, i) => (
                              <motion.div
                                key={i}
                                whileHover={{
                                  scale: 1.1,
                                }}
                                style={{
                                  display:
                                    "inline-block",
                                }}
                              >
                                <Chip
                                  label={skill}
                                  size="small"
                                  sx={styles.skillChip}
                                />
                              </motion.div>
                            )
                          )}
                        </Box>
                      </CardContent>

                      <Box p={2}>
                        <Button
                          fullWidth
                          variant="contained"
                          disabled={
                            !a.availableForMentorship
                          }
                          sx={styles.ctaButton}
                          onClick={() => {
                            setSelectedAlumni(
                              a
                            );
                            setOpenDialog(true);
                          }}
                        >
                          {a.availableForMentorship
                            ? "Request Mentorship"
                            : "Not Available"}
                        </Button>
                      </Box>
                    </MotionCard>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}

        <Box
          display="flex"
          justifyContent="center"
          mt={6}
        >
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            onChange={(e, value) =>
              fetchAlumni(value)
            }
          />
        </Box>
      </Box>

      {/* DIALOG */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: styles.dialogPaper }}
      >
        <DialogTitle sx={{ color: "white" }}>
          Request Mentorship
        </DialogTitle>

        <DialogContent>
          <Typography
            sx={{ opacity: 0.7, mb: 2 }}
          >
            Introduce yourself and explain
            your goals.
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            value={requestMessage}
            onChange={(e) =>
              setRequestMessage(
                e.target.value
              )
            }
            sx={styles.input}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setOpenDialog(false)
            }
            sx={{ color: "#aaa" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={styles.ctaButton}
            onClick={requestMentor}
            disabled={
              !requestMessage.trim()
            }
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    py: 6,
    px: 3,
    color: "white",
  },

  glassSection: {
    p: 3,
    borderRadius: 4,
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    color: "white",
  },

  card: {
    borderRadius: 4,
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    color: "white",
  },

  avatar: {
    width: 64,
    height: 64,
    mr: 2,
  },

  skillChip: {
    mr: 1,
    mb: 1,
    background: "rgba(255,255,255,0.15)",
    color: "white",
  },

  expChip: {
    mt: 1,
    background: "#6366F1",
    color: "white",
  },

  /* TEXTFIELD FIX */
  input: {
    "& .MuiOutlinedInput-root": {
      background: "rgba(255,255,255,0.08)",
      color: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.7)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#8B5CF6",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255,255,255,0.2)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255,255,255,0.4)",
    },
  },

  ctaButton: {
    borderRadius: 3,
    fontWeight: 600,
    background: "linear-gradient(90deg,#6366F1,#8B5CF6)",
  },

  /* DIALOG FIX */
  dialogPaper: {
    background: "rgba(15,23,42,0.98)",
    backdropFilter: "blur(12px)",
    color: "white",
  },
};

