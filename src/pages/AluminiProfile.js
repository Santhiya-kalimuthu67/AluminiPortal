import { useState } from "react";
import { saveAlumniProfile } from "../api/profile.service";
import ProfileForm from "../components/ProfileForm";
import {
  Box,
  Typography,
  Chip,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AlumniProfile({ profile, isEdit = false }) {
  const navigate = useNavigate();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const fields = [
    { name: "education", label: "Education", required: true },
    { name: "company", label: "Company" },
    { name: "designation", label: "Designation" },
    {
      name: "bio",
      label: "Professional Bio",
      multiline: true,
      rows: 4,
      fullWidth: true
    },
    {
      name: "availableForMentorship",
      label: "Available for Mentorship",
      type: "switch"
    },
    { name: "skills", label: "Skills (comma separated)" },
    {
      name: "experience",
      label: "Professional Experience",
      multiline: true,
      rows: 4,
      fullWidth: true
    },
    { name: "linkedin", label: "LinkedIn URL" },
    { name: "github", label: "GitHub URL" }
  ];

  const initialValues =
    isEdit && profile
      ? {
          ...profile,
          skills: Array.isArray(profile.skills)
            ? profile.skills.join(", ")
            : ""
        }
      : {};

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (data.skills) {
        data.skills = data.skills.split(",").map((s) => s.trim());
      }

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
          } else {
            formData.append(key, value);
          }
        }
      });

      await saveAlumniProfile(formData);

      setSnack({
        open: true,
        message: isEdit
          ? "Profile updated successfully!"
          : "Profile created successfully!",
        severity: "success"
      });

      setTimeout(() => {
        navigate("/alumni");
      }, 2000);

    } catch (error) {
      setSnack({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to save profile",
        severity: "error"
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width:"100%",
      
      }}
    >
  <motion.div
  initial={{ opacity: 0, y: -25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  <Box
    sx={{
      width: "100%",
      textAlign: "center",
    }}
  >
    <Chip
      label="Alumni"
      color="secondary"
      sx={{
        mb: 1,
        fontWeight: 600,
        px: 2,
        py: 1
      }}
    />

    <Typography variant="h4" fontWeight={700}>
      {isEdit
        ? "Edit Professional Profile"
        : "Create Professional Profile"}
    </Typography>

    <Typography
      variant="body1"
      color="text.secondary"
      mt={1}
    >
      Showcase your professional journey and connect with students.
    </Typography>
  </Box>
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  whileHover={{ y: -4 }}
>
  <Box
    sx={{
      width: "100%",
      borderRadius: 5,
      border: "1px solid rgba(255,255,255,0.4)",
      transition: "all 0.3s",
      mt:3
    }}
  >
    <ProfileForm
      fields={fields}
      initialData={initialValues}
      onSubmit={handleSubmit}
      showResume={false}
      showToggle={true}
    />
  </Box>
</motion.div>
    

      {/* SNACKBAR */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() =>
          setSnack({ ...snack, open: false })
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          sx={{ fontWeight: 600 }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
    
  );
}