import express from "express";
import {
  upsertStudentProfile,
  upsertAlumniProfile,
  getMyProfile
} from "../Controllers/profileController.js";
import { auth } from "../middleware/auth.js";
import { roleGuard } from "../middleware/roleGuard.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/student",
  auth,
  roleGuard("student"),
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "resume", maxCount: 1 }
  ]),
  upsertStudentProfile
);

router.post(
  "/alumni",
  auth,
  roleGuard("alumni"),
  upload.single("profilePhoto"),
  upsertAlumniProfile
);

router.get(
  "/me",
  auth,
  getMyProfile
);
export default router;
