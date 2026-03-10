import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Auth from "./pages/Auth";
import Unauthorised from "./pages/Unauthorised.js";
import ProtectedRoute from "./pages/ProtectedRoutes.js";
import StudentDashboard from "./pages/StudentDashboard.js";
import StudentJobs from "./pages/StudentJobs.js";
import StudentEvents from "./pages/StudentEvents.js";
import StudentLayout from "./components/StudentLayout";
import StudentProfile from "./pages/StudentProfile.js";
import StudentEvents from "./pages/StudentEvents.js";
import JobDetails from "./pages/JobDetails.js";
import StudentJobs from "./pages/StudentJobs";
import AlumniDirectoryGrid from "./pages/StudentAlumni.js";
import AluminiLayout from "./components/AluminiLayout.js";
import AlumniDashboard from "./pages/AluminiDashboard.js";
import AlumniProfile from "./pages/AluminiProfile.js";
import AluminiProfileUser from "./pages/Alumini/AluminiProfileUser.js";
import MentorshipRequests from "./pages/Alumini/MentorshipRequests.js";
import Opportunities from "./pages/Alumini/Opportunities.js";
import StudentNetwork from "./pages/Alumini/StudentNetwork.js";
import AluminiEvents from "./pages/Alumini/AluminiEvents.js";
import AluminiProfileUser from "./pages/Alumini/AluminiProfileUser.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import AdminLayout from "./components/AdminLayout.js";
import AdminProfile from "./pages/admin/AdminProfile.js";
import AdminProfileUser from "./pages/admin/AdminProfile.js";
import AdminEvents from "./pages/admin/AdminEvents.js";
import AdminUser from "./pages/admin/AdminUser.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" /> },
      { path: "login", element: <Auth /> },
      { path: "unauthorized", element: <Unauthorised /> },

      /* ================= STUDENT ================= */
      {
        element: <ProtectedRoute roles={["student"]} />,
        children: [
          {
            path: "student",
            element: <StudentLayout />,
            children: [
              { index: true, element: <StudentDashboard /> },
              { path: "jobs/:id", element: <JobDetails /> },

              { path: "profile", element: <StudentProfile /> },
              { path: "jobs", element: <StudentJobs /> },
              { path: "alumni", element: <AlumniDirectoryGrid /> },
              { path: "events", element: <StudentEvents /> },
            ],
          },
        ],
      },

      /* ================= ALUMNI ================= */
      {
        element: <ProtectedRoute roles={["alumni"]} />,
        children: [
          {
            path: "alumni",
            element: <AluminiLayout />,
            children: [
              { index: true, element: <AlumniDashboard /> },
               { path: "profile", element: <AlumniProfile /> },
              { path: "aluminiProfile", element: <AluminiProfileUser /> },
              { path: "request", element: <MentorshipRequests /> },
              { path: "opportunity", element: <Opportunities /> },
              { path: "networkk", element: <StudentNetwork /> },
               { path: "events", element: <AluminiEvents/> },
            ],
          },
        ],
      },

      {
        element: <ProtectedRoute roles={["admin"]} />,
        children: [
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: "profile", element: <AdminProfile /> },
              { path: "user", element: < AdminUser/> },
              { path: "events", element: <AdminEvents /> },
            ]
          }
        ]
      }
    ],
  },
]);

export default router;
