import express from "express";
import { getUsers, approveUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/approve/:id", approveUser);

export default router;
