import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Dashboard,
  Person,
  Work,
  Group,
  School,
  Event,
  Logout,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

export default function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();
const menu = [
  { text: "Dashboard", icon: <Dashboard />, path: "/student" },
  { text: "Profile", icon: <Person />, path: "/student/profile" },
  { text: "Jobs", icon: <Work />, path: "/student/jobs" },
  { text: "Alumni", icon: <School />, path: "/student/alumni" },
  { text: "Events", icon: <Event />, path: "/student/events" },
];


  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            background:
              "linear-gradient(180deg, #1e293b, #0f172a)",
            color: "#fff",
            borderRight: "none",
          },
        }}
      >
        <Toolbar>
          <Typography fontWeight={700}>Student Portal</Typography>
        </Toolbar>

        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.text}
             selected={location.pathname.startsWith(item.path)}
  onClick={() => navigate(item.path)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(255,255,255,0.12)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}

          <ListItemButton
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: "#f8fafc",
          p: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
