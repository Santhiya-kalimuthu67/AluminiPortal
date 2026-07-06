import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Switch,
  FormControlLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const API_BASE_URL = "https://alumniportal-backend.onrender.com";

export default function ProfileForm({
  fields,
  onSubmit,
  initialData = {},
  showResume = false,
}) {
  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);
  const [form, setForm] = useState(initialData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      profilePic,
      resume,
    });
  };

  const previewImage = profilePic
  ? URL.createObjectURL(profilePic)
  : form.profilePhoto
  ? `${API_BASE_URL}/${form.profilePhoto.replace(/\\/g, "/")}`
  : "";
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        borderRadius: 4,
        p: 5,
        background: "linear-gradient(145deg,#0f172a,#111827)",
        color: "white",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={1}>
        Complete your profile
      </Typography>

      <Typography
        sx={{
          color: "rgba(255,255,255,0.6)",
          mb: 4,
        }}
      >
        Build your professional identity and unlock new opportunities.
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          p: 2,
          borderRadius: 3,
          mb: 4,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Avatar
          src={previewImage}
          sx={{
            width: 60,
            height: 60,
            bgcolor: "#1f2937",
          }}
        />

        <Button
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{
            background: "linear-gradient(90deg,#6366f1,#ec4899)",
            color: "#fff",
            px: 3,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Upload Photo

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProfilePic(e.target.files?.[0] || null)
            }
          />
        </Button>

        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.5)",
          }}
        >
          JPG, PNG · Max 2MB
        </Typography>
      </Box>

      {showResume && (
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            mb: 4,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography fontWeight={600} mb={2}>
            Resume
          </Typography>

          <Button
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{
              background: "linear-gradient(90deg,#6366f1,#ec4899)",
              color: "#fff",
              px: 3,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Upload Resume

            <input
              hidden
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setResume(e.target.files?.[0] || null)
              }
            />
          </Button>

          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {resume
              ? `Selected: ${resume.name}`
              : form.resume
              ? "Resume already uploaded"
              : "PDF, DOC or DOCX"}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 3,
        }}
      >
        {fields.map((field) => {
          if (field.type === "switch") {
            return (
              <FormControlLabel
                key={field.name}
                control={
                  <Switch
                    checked={form[field.name] || false}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [field.name]: e.target.checked,
                      })
                    }
                  />
                }
                label={field.label}
                sx={{
                  gridColumn: "1 / -1",
                }}
              />
            );
          }

          return (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={form[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              multiline={field.multiline}
              minRows={field.multiline ? 3 : 1}
              fullWidth
              sx={{
                gridColumn: field.fullWidth
                  ? "1 / -1"
                  : "auto",

                "& .MuiOutlinedInput-root": {
                  background: "#0b1220",
                  borderRadius: 2,
                  color: "white",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.15)",
                },

                "& .MuiInputLabel-root": {
                  color: "rgba(255,255,255,0.6)",
                },
              }}
            />
          );
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 5,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "none",
            background: "linear-gradient(90deg,#6366f1,#ec4899)",
          }}
        >
          Save Profile
        </Button>
      </Box>
    </Box>
  );
}