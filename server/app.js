import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import jobApplicationRoutes from "./routes/jobApplicationRoutes.js";
import aluminiRoutes from "./routes/alumniRoutes.js";
import mentorshipRoutes from './routes/Mentorshiproutes.js'
import chatRoutes from './routes/chat.routes.js'
import eventRoutes from "./routes/EventsRoutes.js"
import dashboardRoutes from './routes/dashboardRoutes.js'

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/job",jobRoutes);
app.use("/api/application",applicationRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/applications", applicationRoutes);
app.use("/api/applications", jobApplicationRoutes);
app.use("/api/alumni",aluminiRoutes);
app.use("/api/mentorship", mentorshipRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/events", eventRoutes);
app.use('/api/dashboard',dashboardRoutes)


export default app;
    


