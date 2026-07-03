import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    speaker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["webinar", "workshop"], required: true },
    date: { type: Date, required: true },
    duration: Number,
    location: String, // Zoom link or venue
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
