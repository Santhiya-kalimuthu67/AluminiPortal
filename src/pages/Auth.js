import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { login, register } from "../api/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);;

export default function Auth() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore.getState();

  const [isLogin, setIsLogin] = useState(true);
  const [loginLoader, setLoginLoader] = useState(false);
  const [registerLoader, setRegisterLoader] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLogin ? handleLogin(form) : handleRegister(form);
  };

  const handleLogin = async (payload) => {
    setLoginLoader(true);
    try {
      const response = await login(payload);
      const { token, role, isFirstLogin, user } = response.data;
      setAuth({ token, role, isFirstLogin, user });
if(role == 'admin'){
  navigate(`/${role}`)
  return
}  

      setSnackbar({
        open: true,
        message: "Login successful",
        severity: "success",
      });
      setTimeout(() => {
        navigate(isFirstLogin  ? `/${role}/profile` : `/${role}`);
      }, 1200);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Invalid email or password",
        severity: "error",
      });
    } finally {
      setLoginLoader(false);
    }
  };

  const handleRegister = async (payload) => {
    setRegisterLoader(true);
    try {
      await register(payload);

      setSnackbar({
        open: true,
        message: "Registered successfully",
        severity: "success",
      });

      setTimeout(() => {
        setIsLogin(true);
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Registration failed",
        severity: "error",
      });
    } finally {
      setRegisterLoader(false);
    }
  };

  return (
    <Box sx={styles.background}>
      {/* Floating Glow Effect */}
      <MotionBox
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        sx={styles.glow}
      />

      <MotionCard
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        sx={styles.card}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            fontWeight={700}
            color="white"
            mb={1}
          >
            Alumni Portal
          </Typography>

          <Typography
            align="center"
            color="white"
            mb={3}
            sx={{ opacity: 0.8 }}
          >
            {isLogin
              ? "Welcome back 👋"
              : "Create your future 🚀"}
          </Typography>

          <MotionBox
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            component="form"
            onSubmit={handleSubmit}
            sx={styles.form}
          >
            {!isLogin && (
              <TextField
                label="Full Name"
                name="name"
                variant="filled"
                fullWidth
                required
                onChange={handleChange}
              />
            )}

            <TextField
              label="Email"
              name="email"
              type="email"
              variant="filled"
              fullWidth
              required
              onChange={handleChange}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              variant="filled"
              fullWidth
              required
              onChange={handleChange}
            />

            {!isLogin && (
              <TextField
                select
                label="Role"
                name="role"
                variant="filled"
                fullWidth
                value={form.role}
                onChange={handleChange}
              >
                 <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="alumni">Alumni</MenuItem>
              </TextField>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={styles.button}
              disabled={loginLoader || registerLoader}
            >
              {loginLoader || registerLoader ? (
                <CircularProgress size={22} color="inherit" />
              ) : isLogin ? (
                "Login"
              ) : (
                "Register"
              )}
            </Button>
          </MotionBox>

          <Typography
            align="center"
            sx={styles.toggle}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "New user? Register"
              : "Already have an account? Login"}
          </Typography>
        </CardContent>
      </MotionCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const styles = {
  background: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    width: 600,
    height: 600,
    background:
      "radial-gradient(circle,rgba(99,102,241,0.4),transparent 70%)",
    borderRadius: "50%",
  },
  card: {
    width: 420,
    borderRadius: 4,
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    padding: 2,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  button: {
    mt: 2,
    borderRadius: 3,
    fontWeight: 600,
    background:
      "linear-gradient(90deg,#6366F1,#8B5CF6)",
  },
  toggle: {
    mt: 3,
    color: "#fff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

