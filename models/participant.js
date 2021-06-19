const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantSchema = Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
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
        crn: {
            type: String,
            required: true,
        },
        registered_events: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }],
    }
);

module.exports = mongoose.model("Participant", ParticipantSchema);
