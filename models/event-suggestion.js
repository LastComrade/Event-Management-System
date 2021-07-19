const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSuggestion = Schema(
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
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventSuggestion", eventSuggestion);
