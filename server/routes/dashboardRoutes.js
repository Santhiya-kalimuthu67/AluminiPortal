import express from "express";
import Application from "../models/Application.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import MentorshipRequest from "../models/MentorshipRequest.js";
import { auth } from "../middleware/auth.js";
import { roleGuard } from "../middleware/roleGuard.js";
import mongoose from 'mongoose'
import Event from "../models/Event.js";
const router = express.Router();

router.get("/student", auth, roleGuard("student"), async (req, res) => {

  try {
    const userId = req.user.id;

    const profile = await User.findById(userId);

    const jobsCount = await Job.countDocuments();

    const jobsApplied = await JobApplication.countDocuments({
      studentId: userId,
    });

    const mentorshipCount = await MentorshipRequest.countDocuments({
      studentId: userId,
      status: "pending",
    });

    const alumniPreview = await User.find({ role: "alumni" })
      .limit(4)
      .select("name");

    // Example profile completion logic
    const fields = [
      profile.name,
      profile.email,
      profile.skills,
      profile.resume,
    ];

    const completedFields = fields.filter(Boolean).length;
    const profileCompletion = Math.round(
      (completedFields / fields.length) * 100
    );

    res.json({
      profileCompletion,
      hasResume: !!profile.resume,
      jobsCount,
      jobsApplied,
      mentorshipCount,
      alumniPreview,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/alumini", auth, roleGuard("alumni"), async (req, res) => {
  try {
    const alumniId = new mongoose.Types.ObjectId(req.user.id);

    // Jobs posted
    const jobs = await Job.find({ postedBy: alumniId }).select("_id");
    const jobIds = jobs.map(job => job._id);
    const jobsCount = jobs.length;
    // Applicants
    const totalApplicants = await JobApplication.countDocuments({
      job: { $in: jobIds }
    });
    const shortlisted = await JobApplication.countDocuments({
      job: { $in: jobIds },
      status: "Shortlisted"
    });
    const reviewed = await JobApplication.countDocuments({
      job: { $in: jobIds },
      status: { $in: ["Shortlisted", "Rejected", "Hired"] }
    });
    // Mentorship count
    const mentorshipCount = await MentorshipRequest.countDocuments({
      mentor: alumniId,
      status: "Accepted"
    });
    // Profile completion (example logic)
    const user = await User.findById(alumniId);
    let completion = 60;

    if (user.name) completion += 10;
    if (user.email) completion += 10;
    if (user.profileRef) completion += 20;

    res.json({
      jobsCount,
      totalApplicants,
      shortlisted,
      reviewed,
      mentorshipCount,
      profileCompletion: completion
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/admin", auth, roleGuard("admin"), async (req, res) => {
  const pendingUsers = await User.countDocuments({ status: "pending" });
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalAlumni = await User.countDocuments({ role: "alumni" });
  const totalWebinars = await Event.countDocuments();
  const activeMentorships = await MentorshipRequest.countDocuments({ status: "active" });

  res.json({
    pendingUsers,
    totalStudents,
    totalAlumni,
    totalWebinars,
    activeMentorships
  });
});

export default router
