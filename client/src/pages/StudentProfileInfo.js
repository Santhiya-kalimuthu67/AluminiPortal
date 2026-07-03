import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Stack
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  getMyProfile,
  saveStudentProfile
} from "../api/profile.service";

export default function StudentProfile() {
  const [form, setForm] = useState({
    department: "",
    year: "",
    skills: "",
    interests: ""
  });

  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Detect first-time vs edit
  useEffect(() => {
    async function loadProfile() {
      const res = await getMyProfile();

      if (res?.profile && res.profile.role === "student") {
        const p = res.profile;

        setForm({
          department: p.department || "",
          year: p.year || "",
          skills: p.skills?.join(", ") || "",
          interests: p.interests || ""
        });

        setPreview(p.profilePhoto);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();

    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (profilePic) fd.append("profilePic", profilePic);
    if (resume) fd.append("resume", resume);

    await saveStudentProfile(fd);
    setLoading(false);
  };

 return (
   <Box sx={{ maxWidth: 720, mx: "auto", py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Student Profile
        </Typography>

        {/* Profile Photo */}
        <Stack direction="row" spacing={2} mb={3} alignItems="center">
          <Avatar src={preview} sx={{ width: 80, height: 80 }} />
          <Button component="label" startIcon={<CloudUploadIcon />}>
            Upload Photo
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                setProfilePic(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </Button>
        </Stack>

        <Stack spacing={2}>
          <TextField
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          />

          <TextField
            label="Year of Study"
            name="year"
            value={form.year}
            onChange={handleChange}
            required
          />

          <TextField
            label="Skills (comma separated)"
            name="skills"
            value={form.skills}
            onChange={handleChange}
          />

          <TextField
            label="Interests"
            name="interests"
            value={form.interests}
            onChange={handleChange}
            multiline
          />

          {/* Resume */}
          <Button component="label" startIcon={<CloudUploadIcon />}>
            Upload Resume
            <input
              hidden
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </Stack>
      </Paper>
    </Box>
);
  
}
