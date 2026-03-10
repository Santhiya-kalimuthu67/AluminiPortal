import {
  Box,
  Avatar,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
  Switch
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const API_BASE_URL = "http://localhost:5000";

export default function AluminiViewCard({ profile, onEdit }) {
  const profileImage = profile.profilePhoto
    ? `${API_BASE_URL}/${profile.profilePhoto.replace(/\\/g, "/")}`
    : "";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3
      }}
    >
      <MotionBox
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          width: "100%",
          maxWidth: 850,
          p: 4,
          borderRadius: 4,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          color: "white"
        }}
      >
        {/* HEADER */}
        <Stack direction="row" spacing={3} alignItems="center">
          <motion.div whileHover={{ scale: 1.08 }}>
            <Avatar
              src={profileImage}
              sx={{
                width: 110,
                height: 110,
                fontSize: 36,
                fontWeight: 700,
                background:
                  "linear-gradient(135deg,#6366F1,#8B5CF6)"
              }}
            >
              {!profileImage &&
                profile.designation?.charAt(0)?.toUpperCase()}
            </Avatar>
          </motion.div>

          <Box>
            <Typography variant="h4" fontWeight={700}>
              {profile.designation || "Professional"}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <BusinessIcon sx={{ fontSize: 18, opacity: 0.7 }} />
              <Typography sx={{ opacity: 0.8 }}>
                {profile.company}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <WorkIcon sx={{ fontSize: 18, opacity: 0.7 }} />
              <Typography sx={{ opacity: 0.8 }}>
                {profile.experience}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

        {/* EDUCATION */}
        {profile.education && (
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <SchoolIcon sx={{ fontSize: 18, opacity: 0.7 }} />
            <Typography sx={{ opacity: 0.9 }}>
              {profile.education}
            </Typography>
          </Stack>
        )}

        {/* SKILLS */}
        {Array.isArray(profile.skills) &&
          profile.skills.length > 0 && (
            <>
              <Typography fontWeight={600} mb={2}>
                Core Expertise
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {profile.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Chip
                      label={skill}
                      sx={{
                        background:
                          "linear-gradient(90deg,#6366F1,#8B5CF6)",
                        color: "white"
                      }}
                    />
                  </motion.div>
                ))}
              </Stack>
            </>
          )}

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

        {/* MENTORSHIP STATUS */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography fontWeight={600}>
            Available for Mentorship
          </Typography>

          <Switch
            checked={profile.availableForMentorship}
            disabled
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#8B5CF6"
              }
            }}
          />
        </Stack>

        {/* ACTION */}
        <Stack direction="row" justifyContent="flex-end">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={onEdit}
              sx={{
                background:
                  "linear-gradient(90deg,#6366F1,#8B5CF6)",
                borderRadius: 3,
                fontWeight: 600
              }}
            >
              Edit Profile
            </Button>
          </motion.div>
        </Stack>
      </MotionBox>
    </Box>
  );
}
