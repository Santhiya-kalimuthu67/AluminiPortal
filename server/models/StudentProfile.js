// models/StudentProfile.js
import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    department: {
      type: String,
      required: true,
      trim: true
    },

    year: {
      type: String,
      required: true
    },

    skills: {
      type: [String],
      default: []
    },

    interests: {
      type: String,
      trim: true
    },

    resume: {
      type: String 
    },

    profilePhoto: {
      type: String 
    }
  },
  {
    timestamps: true 
  }
);

export default mongoose.model("StudentProfile", studentProfileSchema);

