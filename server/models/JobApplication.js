import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: String, // optional snapshot (URL)
    coverLetter: String,
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected", "Hired"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

// Prevent duplicate applications
JobApplicationSchema.index({ job: 1, student: 1 }, { unique: true });

export default mongoose.model("JobApplication", JobApplicationSchema);
