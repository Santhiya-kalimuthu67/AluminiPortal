import { useState } from "react";
import { saveAlumniProfile } from "../../api/profile.service";
import ProfileForm from "../../components/ProfileForm";
import {
  Box,
  Typography,
  Chip,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminProfileForm({ profile, isEdit = false,isAdmin=false }) {
  const navigate = useNavigate();

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const fields = [
    { name: "designation", label: "Designation" },
    {
      name: "bio",
      label: "Professional Bio",
      multiline: true,
      rows: 4,
      fullWidth: true
    },
    { name: "linkedin", label: "LinkedIn URL" },
    { name: "github", label: "GitHub URL" }
  ];

  // ✅ Prefill transformation
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

      // Convert skills string → array
      if (data.skills) {
        data.skills = data.skills
          .split(",")
          .map((s) => s.trim());
      }

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) =>
              formData.append(key, v)
            );
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
        background:
          "linear-gradient(135deg, #f4f6f9 0%, #ffffff 60%)",
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 }
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          mb: 5,
          textAlign: "center"
        }}
      >
        <Chip
          label="Alumni"
          color="secondary"
          sx={{ mb: 1, fontWeight: 600 }}
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

      {/* ✅ Prefilled Form */}
      <ProfileForm
        fields={fields}
        initialData={initialValues}
        onSubmit={handleSubmit}
        showResume={false}
        showToggle={true}
      />

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() =>
          setSnack({ ...snack, open: false })
        }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
