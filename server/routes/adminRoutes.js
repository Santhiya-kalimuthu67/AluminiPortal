import express from "express";
import { auth } from "../middleware/auth.js";
import { roleGuard } from "../middleware/roleGuard.js";
import { getPendingUsers, approveUser } from "../Controllers/adminController.js";
import { getAdminProfile } from "../Controllers/adminController.js";


const router = express.Router();

router.get("/pending", auth, roleGuard("admin"), getPendingUsers);
router.put("/approve/:id", auth, roleGuard("admin"), approveUser);
//router.get("/profile", auth, getAdminProfile);
//router.put("/profile", auth, upsertAdminProfile);

export default router;
