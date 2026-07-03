import mongoose from "mongoose";

const alumniProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },

    education: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    department: {
      type: String,
      trim: true,
      index: true
    },

    graduationYear: {
      type: Number,
      index: true
    },

    company: {
      type: String,
      trim: true,
      index: true
    },

    designation: {
      type: String,
      trim: true
    },

    skills: {
      type: [String],
      default: [],
      index: true
    },

    experience: {
      type: String,
      trim: true
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      index: true
    },

    availableForMentorship: {
      type: Boolean,
      default: false,
      index: true
    },

    linkedin: {
      type: String,
      trim: true
    },

    github: {
      type: String,
      trim: true
    },

    profilePhoto: String
  },
  { timestamps: true }
);

// Compound Index for filtering power
alumniProfileSchema.index({
  department: 1,
  graduationYear: 1,
  company: 1,
  skills: 1,
  availableForMentorship: 1
});

export default mongoose.model("AlumniProfile", alumniProfileSchema);
