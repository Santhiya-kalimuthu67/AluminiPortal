import express from "express";
import { auth } from "../middleware/auth.js";
import { applyJob, getJobApplicants, getStudentApplications } from "../Controllers/jobApplicationController.js";
import Job from "../models/Job.js";



const router = express.Router();

// Student → Apply Job
router.post("/apply/:jobId", auth,applyJob);
// Alumni → Applicants for a job
router.get("/job/:jobId/applicants", getJobApplicants);
// Student → My applications
router.get("/student/:id", getStudentApplications);




export default router;
