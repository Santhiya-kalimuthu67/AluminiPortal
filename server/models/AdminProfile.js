import mongoose from "mongoose";

const adminProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    designation: {
      type: String,
      required: true,
      trim: true
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 300
    },

    profilePhoto: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("AdminProfile", adminProfileSchema);
