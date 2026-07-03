import express from "express";
import Chat from "../models/Chat.js";
import MentorshipRequest from "../models/MentorshipRequest.js";
import {auth} from "../middleware/auth.js";

const router = express.Router();


// Send message
router.post("/", auth, async (req, res) => {
  const { mentorshipId, message } = req.body;

  const mentorship = await MentorshipRequest.findById(mentorshipId);

  if (!mentorship || mentorship.status !== "accepted")
    return res.status(403).json({ error: "Chat not allowed" });

  const isParticipant =
    mentorship.studentId.toString() === req.user._id.toString() ||
    mentorship.alumniId.toString() === req.user._id.toString();

  if (!isParticipant)
    return res.status(403).json({ error: "Unauthorized" });

  const chat = await Chat.create({
    mentorshipId,
    senderId: req.user._id,
    message
  });

  res.json(chat);
});


// Get messages
router.get("/:mentorshipId", auth, async (req, res) => {
  const messages = await Chat
    .find({ mentorshipId: req.params.mentorshipId })
    .populate("senderId", "name");

  res.json(messages);
});

export default router;
