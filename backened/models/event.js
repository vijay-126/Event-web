import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    dateTime: {
      type: String,
    },

    venueName: {
      type: String,
    },

    venueAddress: {
      type: String,
    },

    city: {
      type: String,
      default: "Sydney",
      index: true,
    },

    description: {
      type: String,
    },

    categories: {
      type: [String],
      default: [],
    },

    imageUrl: {
      type: String,
    },

    source: {
      type: String,
      required: true,
    },

    originalUrl: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    lastScrapedAt: {
      type: Date,
      default: Date.now,
    },

    lastChangedHash: {
      type: String,
    },

    status: {
      type: String,
      enum: ["new", "updated", "inactive"],
      default: "new",
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
