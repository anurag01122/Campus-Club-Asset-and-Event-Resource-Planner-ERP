const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    institution: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    phone: {
      type: Number,
      required: true
    },

role: {
  type: String,
  enum: ["faculty", "president", "vice_president", "member"],
  default: "member"
}

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
