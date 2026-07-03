import express from "express";
import Event from "../models/Event.js";
import EventRegistration from "../models/EventRegistration.js";
import {auth} from "../middleware/auth.js";
import {roleGuard} from "../middleware/roleGuard.js";

const router = express.Router();

/* CREATE EVENT (Admin / Alumni) */
router.post("/", auth, roleGuard("admin", "alumni"), async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* GET ALL EVENTS */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("speaker", "name email")
      .sort({ date: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/register", auth, async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: "Event ID required" });
    }

    const registration = await EventRegistration.create({
      eventId,
      userId: req.user.id, // use id since you attach decoded directly
    });

    res.status(201).json(registration);
  } catch (err) {
    res.status(400).json({ error: "Already registered or invalid event" });
  }
});


/* MARK ATTENDED (Admin only) */
router.patch("/:id/attend/:userId", auth, roleGuard(["admin"]), async (req, res) => {
  try {
    const record = await EventRegistration.findOne({
      eventId: req.params.id,
      userId: req.params.userId,
    });

    if (!record) return res.status(404).json({ error: "Not found" });

    record.status = "attended";
    await record.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.get(
  "/registrations",
  auth,
  roleGuard("admin", "alumni"),
  async (req, res) => {
    try {
      let eventIds = [];

      if (req.user.role === "alumni") {
        // Alumni → only their events
        const events = await Event.find({
          createdBy: req.user._id
        }).select("_id");

        eventIds = events.map(e => e._id);
      } else {
        // Admin → all events
        const events = await Event.find().select("_id");
        eventIds = events.map(e => e._id);
      }

      const registrations = await EventRegistration.find({
        eventId: { $in: eventIds }
      })
        .populate("eventId", "title type date location")
        .populate("userId", "name email profilePhoto")
        .sort({ createdAt: -1 });

      res.json(registrations);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
