import express from "express";
import mongoose from "mongoose";
import MentorshipRequest from "../models/MentorshipRequest.js";
import { auth } from "../middleware/auth.js";
import { roleGuard } from "../middleware/roleGuard.js";

const router = express.Router();

/* ===============================
   STUDENT → SEND REQUEST
================================= */
router.post("/", auth, roleGuard("student"), async (req, res) => {
  try {
    const { alumniId, message } = req.body;

    if (!alumniId || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const studentId = new mongoose.Types.ObjectId(req.user.id);
    const alumniObjectId = new mongoose.Types.ObjectId(alumniId);

    // prevent duplicate pending
    const exists = await MentorshipRequest.findOne({
      studentId,
      alumniId: alumniObjectId,
      status: "pending"
    });

    if (exists) {
      return res.status(400).json({ error: "Already requested" });
    }

    const request = await MentorshipRequest.create({
      studentId,
      alumniId: alumniObjectId,
      message
    });

    res.status(201).json({
      message: "Request sent successfully",
      data: request
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


/* ===============================
   ALUMNI → VIEW INCOMING
================================= */
router.get("/incoming", auth, roleGuard("alumni"), async (req, res) => {
  try {
const alumniId = new mongoose.Types.ObjectId(req.user.id);
    const requests = await MentorshipRequest.find({
     alumniId: alumniId
    })
      .populate("studentId", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


/* ===============================
   ALUMNI → ACCEPT / REJECT
================================= */
router.patch("/:id", auth, roleGuard("alumni"), async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const request = await MentorshipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: "Not found" });
    }

    if (request.alumniId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    request.status = status;
    await request.save();

    res.json(request);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
