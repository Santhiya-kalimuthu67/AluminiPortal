import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import api from "../../api/api.axios";
import toast from "react-hot-toast";
import { MenuItem } from "@mui/material";
export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    skills: "",
    description: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/job/create-job", {
        ...form,
        skills: form.skills.split(","),
        isActive: true,
      });
      toast.success("Job posted successfully");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <Box p={4}>
      <Paper sx={{ p: 4, maxWidth: 700 }}>
        <Typography variant="h5" mb={3}>
          Post New Opportunity
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Job Title"
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <TextField
            label="Company"
            onChange={(e) => handleChange("company", e.target.value)}
          />

          <TextField
            label="Location"
            onChange={(e) => handleChange("location", e.target.value)}
          />

          <TextField
            select
            label="Job Type"
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>
          <TextField
            label="Required Skills (comma separated)"
            onChange={(e) => handleChange("skills", e.target.value)}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Publish Job
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
