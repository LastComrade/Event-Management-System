const mongoose = require("mongoose");

const MagazineRecieverSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    subscribed: {
      type: Boolean,
      default: true
    },
    sheet_position: {
      type: String,
      default: "0"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MagazineReciever", MagazineRecieverSchema);