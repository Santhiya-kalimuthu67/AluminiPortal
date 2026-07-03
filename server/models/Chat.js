import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  mentorshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MentorshipRequest"
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  message: String
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
