import express from "express";
import Application from "../models/Application.js";
import { auth } from "../middleware/auth.js";
import { roleGuard } from "../middleware/roleGuard.js";

const router = express.Router();

// Student → Apply
router.post("/", async (req, res) => {
  const app = await Application.create(req.body);
  res.json(app);
});

// Student → Application Status
router.get("/student/:id", async (req, res) => {
  const apps = await Application.find({ student: req.params.id })
    .populate("job");
  res.json(apps);
});

// Alumni → Update Status
router.put("/:id/status", async (req, res) => {
  const app = await Application.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(app);
});



export default router;
