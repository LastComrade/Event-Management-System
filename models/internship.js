const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternshipSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      reuired: true
    }
  }
);

module.exports = mongoose.model("Internship", InternshipSchema);
