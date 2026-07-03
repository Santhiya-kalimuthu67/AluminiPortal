import User from "../models/User.js";
import AdminProfile from "../models/AdminProfile.js";

export const getPendingUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

export const approveUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "User approved" });
};

export const getAdminProfile = async (req, res) => {
  const profile = await AdminProfile.findOne({ userId: req.user.id })
    .populate("userId", "name email");

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json(profile);
};

export const upsertAdminProfile = async (req, res) => {
  const { designation, bio, profilePhoto } = req.body;

  const profile = await AdminProfile.findOneAndUpdate(
    { userId: req.user.id },
    { designation, bio, profilePhoto },
    { new: true, upsert: true }
  );

  res.json(profile);
};

