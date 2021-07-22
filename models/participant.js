const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        college_name: {
            type: String,
            required: true,
        },
        linkedin_account: {
            type: String,
            required: true,
        },
        registered_events: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Participant", ParticipantSchema);
