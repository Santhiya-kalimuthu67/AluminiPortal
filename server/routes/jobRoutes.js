import express from "express";
import Job from "../models/Job.js";
import { auth } from "../middleware/auth.js";
import { roleGuard } from "../middleware/roleGuard.js";

const router = express.Router();

// Alumni → Post Job
router.post("/create-job", auth, roleGuard("alumni"), async (req, res) => {
  const job = await Job.create({
    ...req.body,
    postedBy: req.user.id
  });

  res.json(job);
});


// Students → View Jobs
router.get("/find-job", async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Find Job Error:", error);
    return res.status(500).json({
      message: "Failed to fetch jobs"
    });
  }
});
// GET /api/jobs/:id
router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
});
// Alumni → Manage Jobs
router.get("/alumni/:id", async (req, res) => {
  const jobs = await Job.find({ postedBy: req.params.id });
  res.json(jobs);
});



export default router;
