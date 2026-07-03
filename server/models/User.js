import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["admin", "alumni", "student"],
    default: "student"
  },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  },

  profileRef: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "role"
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
