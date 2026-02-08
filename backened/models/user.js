import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    unique: true,
    sparse: true, // allows Google users without username
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: function () {
      return this.authProvider === "local";
    },
  },

  googleId: {
    type: String,
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  profilePicture: {
    type: String,
    default: "",
  },

  active: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);

