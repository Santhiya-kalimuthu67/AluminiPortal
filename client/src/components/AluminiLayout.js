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
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SchoolIcon from "@mui/icons-material/School";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

export default function AluminiLayout() {
  const navigate = useNavigate();
  const location = useLocation();
const menu = [
  { text: "Overview", icon: <DashboardIcon />, path: "/alumni" },
  { text: "Professional Profile", icon: <AccountCircleIcon />, path: "/alumni/aluminiProfile" },
  { text: "Mentorship Requests", icon: <HandshakeIcon />, path: "/alumni/request" },
  { text: "Students Network", icon: <GroupIcon />, path: "/alumni/networkk" },
  { text: "Opportunities", icon: <WorkOutlineIcon />, path: "/alumni/opportunity" },
  { text: "Sessions & Events", icon: <EventAvailableIcon />, path: "/alumni/events" },
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
          <Typography fontWeight={700}>Alumini Portal</Typography>
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
              {/* <Logout /> */}
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
          //p: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
