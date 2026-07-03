import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { Typography, Button, Box, Avatar, Paper, Chip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { saveStudentProfile } from "../api/profile.service";
export default function StudentProfileForm({ profile = null, onSaved,isAlumini=false }) {
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "department", label: "Department", required: true },
    { name: "year", label: "Year of Study", required: true },
    { name: "skills", label: "Skills (comma separated)" },
    {
      name: "interests",
      label: "Interests",
      fullWidth: true,
    },
  ];

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("department", data.department);
      formData.append("year", data.year);
      formData.append("skills", data.skills || "");
      formData.append("interests", data.interests || "");

      // ✅ REAL FILE objects
      if (data.profilePic instanceof File) {
        formData.append("profilePic", data.profilePic);
      }

      if (data.resume instanceof File) {
        formData.append("resume", data.resume);
      }

      const res = await saveStudentProfile(formData);
console.info("response",res)
      // ✅ Notify parent
      if (res?.data && onSaved) {
        onSaved(res.data);
      }
    } catch (error) {
      console.info("Profile save failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f7f9fc, #ffffff)",
        px: { xs: 2, sm: 4 },
        py: { xs: 3, sm: 6 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          maxWidth: 720,
          mx: "auto",
          mb: 4,
          textAlign: "center",
        }}
      >
        <Chip
          label="Student"
          color="primary"
          sx={{ mb: 1, fontWeight: 600 }}
        />

        <Typography variant="h4" fontWeight={700}>
          Your Profile
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Complete your profile to apply for jobs and connect with alumni.
        </Typography>
      </Box>

      {/* Form */}
      <ProfileForm
        fields={fields}
        initialData={profile}
        onSubmit={handleSubmit}
        showResume
        loading={loading}
      />
    </Box>
  );
}

