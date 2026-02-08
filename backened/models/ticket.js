import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  consent: {
    type: Boolean,
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  eventUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Ticket", TicketSchema);
