const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternshipSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    preferred_dept_1: {
      type: String,
      default: "No Preference"
    },
    preferred_dept_2: {
      type: String,
      default: "No Preference"
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      reuired: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Internship", InternshipSchema);
