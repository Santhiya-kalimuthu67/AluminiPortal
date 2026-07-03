import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";
import api from "../../api/api.axios";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "webinar",
    date: "",
    duration: "",
    location: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/events", form);
      setSuccess(true);
      setForm({
        title: "",
        description: "",
        type: "webinar",
        date: "",
        duration: "",
        location: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        bgcolor: "#0f172a",
        color: "#fff"
      }}
    >
      <Typography variant="h5" mb={3}>
        Create Event
      </Typography>

      <Paper
        sx={{
          p: 4,
          maxWidth: 700,
          bgcolor: "#1e293b",
          borderRadius: 3
        }}
      >
        <TextField
          fullWidth
          label="Event Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{ input: { color: "#fff" } }}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{ textarea: { color: "#fff" } }}
        />

        <TextField
          select
          fullWidth
          label="Event Type"
          name="type"
          value={form.type}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{ input: { color: "#fff" } }}
        >
          <MenuItem value="webinar">Webinar</MenuItem>
          <MenuItem value="workshop">Workshop</MenuItem>
        </TextField>

        <TextField
          fullWidth
          type="datetime-local"
          label="Event Date"
          name="date"
          value={form.date}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true, style: { color: "#ccc" } }}
          sx={{ input: { color: "#fff" } }}
        />

        <TextField
          fullWidth
          label="Duration (minutes)"
          name="duration"
          type="number"
          value={form.duration}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{ input: { color: "#fff" } }}
        />

        <TextField
          fullWidth
          label="Location / Zoom Link"
          name="location"
          value={form.location}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{ input: { color: "#fff" } }}
        />

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
          onClick={handleSubmit}
        >
          Create Event
        </Button>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" variant="filled">
          Event created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
