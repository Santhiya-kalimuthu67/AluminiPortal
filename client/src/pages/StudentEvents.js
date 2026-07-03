import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  Avatar,
  CircularProgress,
  Alert,
  Stack
} from "@mui/material";
import { motion } from "framer-motion";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import toast from "react-hot-toast";
import { fetchEvents, registerEvents } from "../api/events.service";

const MotionCard = motion.create(Card);

export default function StudentEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registeringId, setRegisteringId] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetchEvents();
        setEvents(res);
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to load events"
        );
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleRegister = async (id) => {
    try {
      setRegisteringId(id);
      await registerEvents({ eventId: id });
      toast.success("Successfully registered!");
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Registration failed"
      );
    } finally {
      setRegisteringId(null);
    }
  };

  const getEventStatus = (date) => {
    const today = new Date();
    const eventDate = new Date(date);

    if (eventDate.toDateString() === today.toDateString())
      return { label: "Today", color: "#10B981" };

    if (eventDate > today)
      return { label: "Upcoming", color: "#6366F1" };

    return { label: "Past", color: "#64748B" };
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={styles.page}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Typography
          variant="h4"
          fontWeight={700}
          mb={5}
          color="white"
        >
          Explore Events & Workshops 🚀
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              "& .MuiAlert-message": { color: "white" }
            }}
          >
            {error}
          </Alert>
        )}

        {events.length === 0 ? (
          <Typography
            textAlign="center"
            sx={{ opacity: 0.6 }}
          >
            No events available.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {events.map((event, index) => {
              const status = getEventStatus(event.date);

              return (
                <Grid item xs={12} sm={6} md={4} key={event._id}>
                  <MotionCard
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    sx={styles.card}
                  >
                    <CardContent>
                      <Stack spacing={1.5}>
                        {/* Type + Status */}
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                        >
                          <Chip
                            label={event.type?.toUpperCase()}
                            sx={{
                              background:
                                event.type === "webinar"
                                  ? "#0EA5E9"
                                  : "#8B5CF6",
                              color: "white"
                            }}
                            size="small"
                          />

                          <Chip
                            label={status.label}
                            size="small"
                            sx={{
                              background: status.color,
                              color: "white"
                            }}
                          />
                        </Stack>

                        {/* Title */}
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          color="white"
                        >
                          {event.title}
                        </Typography>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          sx={{ opacity: 0.7 }}
                        >
                          {event.description}
                        </Typography>

                        {/* Date */}
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <CalendarTodayIcon fontSize="small" />
                          <Typography variant="body2">
                            {new Date(
                              event.date
                            ).toLocaleDateString()}
                          </Typography>
                        </Box>

                        {/* Duration */}
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <AccessTimeIcon fontSize="small" />
                          <Typography variant="body2">
                            {event.duration} mins
                          </Typography>
                        </Box>

                        {/* Speaker */}
                        {event.speaker && (
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            mt={2}
                          >
                            <Avatar sx={styles.avatar}>
                              {event.speaker?.name
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </Avatar>

                            <Box>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                              >
                                {event.speaker?.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ opacity: 0.6 }}
                              >
                                {event.speaker?.email}
                              </Typography>
                            </Box>
                          </Stack>
                        )}
                      </Stack>
                    </CardContent>

                    {/* CTA */}
                    <Box p={2}>
                      <Button
                        fullWidth
                        disabled={
                          registeringId === event._id
                        }
                        onClick={() =>
                          handleRegister(event._id)
                        }
                        sx={styles.ctaButton}
                      >
                        {registeringId === event._id ? (
                          <CircularProgress
                            size={20}
                            sx={{ color: "white" }}
                          />
                        ) : (
                          "Register Now"
                        )}
                      </Button>
                    </Box>
                  </MotionCard>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b)",
    py: 6,
    px: 3,
    color: "white",
  },
  card: {
    borderRadius: 4,
    background:
      "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    boxShadow:
      "0 8px 32px rgba(0,0,0,0.4)",
    color: "white",
  },
  avatar: {
    width: 36,
    height: 36,
  },
  ctaButton: {
    borderRadius: 3,
    fontWeight: 600,
    color:"#fff",
    background:
      "linear-gradient(90deg,#6366F1,#8B5CF6)",
    "&:hover": {
      background:
        "linear-gradient(90deg,#4F46E5,#7C3AED)",
    },
  },
};
