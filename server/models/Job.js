import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    type: { type: String, enum: ["Full-time", "Internship", "Part-time", "Contract"]
},
    description: String,
    skills: [String],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Alumni
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
