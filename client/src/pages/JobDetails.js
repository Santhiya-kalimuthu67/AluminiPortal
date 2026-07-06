import {
  Box,
  Typography,
  Chip,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { applyJob, getJobById } from "../api/job.service";

const MotionBox = motion(Box);

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [showCover, setShowCover] = useState(false);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await getJobById(id);
        setJob(response);
      } catch (error) {
        toast.error("Failed to load job");
      }
    }

    load();
  }, [id]);

  const applyNow = async () => {
    if (!resume) {
      toast.error("Please upload resume before applying");
      return;
    }

    try {
      setApplying(true);

      await applyJob({
        jobId: id,
        resume,
        coverLetter,
      });

      toast.success("Application submitted 🎉");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to apply"
      );
    } finally {
      setApplying(false);
    }
  };

  if (!job) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={styles.page}>
      {/* HERO */}

      <MotionBox
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={styles.hero}
      >
        <Stack spacing={2} maxWidth="900px">
          <Chip label={job.type} sx={styles.typeChip} />

          <Typography
            fontSize={{ xs: 28, md: 44 }}
            fontWeight={800}
          >
            {job.title}
          </Typography>

          <Typography sx={{ opacity: 0.7 }}>
            {job.company}
          </Typography>
        </Stack>
      </MotionBox>

      {/* CONTENT */}

      <Box sx={styles.contentWrapper}>
        <Stack spacing={5}>
          {/* ABOUT */}

          <MotionBox sx={styles.glassSection}>
            <Typography fontWeight={700} mb={1}>
              About the Role
            </Typography>

            <Typography sx={{ opacity: 0.8 }}>
              {job.description}
            </Typography>
          </MotionBox>

          {/* SKILLS */}

          <MotionBox sx={styles.glassSection}>
            <Typography fontWeight={700} mb={2}>
              Required Skills
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
            >
              {job.skills?.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  sx={styles.skillChip}
                />
              ))}
            </Stack>
          </MotionBox>

          {/* RESUME UPLOAD */}

          <MotionBox sx={styles.glassSection}>
            <Stack spacing={2}>
              <Typography fontWeight={700}>
                Upload Resume
              </Typography>

              <Typography sx={{ opacity: 0.6 }}>
                Upload your latest resume before applying.
              </Typography>

              <Button
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={styles.uploadButton}
              >
                Choose Resume

                <input
                  hidden
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    setResume(
                      e.target.files?.[0] || null
                    )
                  }
                />
              </Button>

              <Typography sx={{ opacity: 0.7 }}>
                {resume
                  ? `Selected: ${resume.name}`
                  : "PDF, DOC or DOCX"}
              </Typography>
            </Stack>
          </MotionBox>

          {/* COVER LETTER */}

          <MotionBox sx={styles.glassSection}>
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
              >
                <Typography fontWeight={600}>
                  Cover Letter (optional)
                </Typography>

                <Button
                  size="small"
                  onClick={() =>
                    setShowCover(!showCover)
                  }
                  sx={{ color: "#8B5CF6" }}
                >
                  {showCover ? "Hide" : "Add"}
                </Button>
              </Stack>

              {showCover && (
                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  placeholder="Why are you a good fit?"
                  value={coverLetter}
                  onChange={(e) =>
                    setCoverLetter(e.target.value)
                  }
                  sx={styles.textField}
                />
              )}
            </Stack>
          </MotionBox>
        </Stack>
      </Box>

      {/* APPLY BAR */}

      <Box sx={styles.applyBar}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          maxWidth="1000px"
          mx="auto"
        >
          <Typography fontWeight={600}>
            Ready to apply?
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={styles.applyButton}
            onClick={applyNow}
            disabled={applying}
          >
            {applying ? "Applying..." : "Apply Now"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b)",
    color: "white",
  },

  hero: {
    px: { xs: 3, md: 10 },
    py: { xs: 6, md: 10 },
    background:
      "linear-gradient(135deg,#111827,#0f172a)",
  },

  contentWrapper: {
    px: { xs: 3, md: 10 },
    py: { xs: 6, md: 8 },
    maxWidth: "1000px",
  },

  glassSection: {
    p: 4,
    borderRadius: 4,
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },

  skillChip: {
    background: "rgba(255,255,255,0.15)",
    color: "white",
  },

  uploadButton: {
    width: "fit-content",
    px: 4,
    py: 1.5,
    borderRadius: 3,
    color: "white",
    textTransform: "none",
    fontWeight: 600,
    background:
      "linear-gradient(90deg,#6366F1,#8B5CF6)",
  },

  textField: {
    "& .MuiOutlinedInput-root": {
      background: "rgba(255,255,255,0.08)",
      color: "white",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255,255,255,0.2)",
    },
  },

  applyBar: {
    position: "sticky",
    bottom: 0,
    backdropFilter: "blur(12px)",
    background: "rgba(15,23,42,0.9)",
    borderTop:
      "1px solid rgba(255,255,255,0.1)",
    py: 3,
    px: 3,
  },

  applyButton: {
    px: 6,
    py: 1.5,
    borderRadius: 3,
    fontWeight: 600,
    background:
      "linear-gradient(90deg,#6366F1,#8B5CF6)",
  },

  typeChip: {
    background: "#6366F1",
    color: "white",
    width: "fit-content",
  },
};