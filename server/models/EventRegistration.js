import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["registered", "attended"],
      default: "registered",
    },
  },
  { timestamps: true }
);

registrationSchema.index(
  { eventId: 1, userId: 1 },
  { unique: true }
);

export default mongoose.model("EventRegistration", registrationSchema);
