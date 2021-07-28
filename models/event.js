const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    event_poster: {
      type: String,
      required: true,
    },
    event_pic: {
      type: String,
      required: true,
    },
    sheetID: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    registration_starts: {
      type: Date,
      required: true,
    },
    registration_ends: {
      type: Date,
      required: true,
    },
    event_starts: {
      type: Date,
      required: true,
    },
    event_ends: {
      type: Date,
      required: true,
    },
    result_declaration: {
      type: Date,
      default: 0000 - 00 - 00,
    },
    organizers: [Object],
    hosts: [Object],
    sponsors: [Object],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
