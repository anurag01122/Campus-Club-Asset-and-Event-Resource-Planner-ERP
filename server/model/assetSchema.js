const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    serialNumber: { type: String, unique: true },
    status: {
      type: String,
      enum: ["Available", "Issued", "Maintenance"],
      default: "Available"
    },
    currentHolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);
