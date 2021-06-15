const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Everything is same as contactSchema but the unique property as true in the username property 
// defines that no username in the DB can be same

const StaffSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
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
        required: true,
    },

    // Department will be verified in the registration middleware
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: "Active Member"
    },
    profile_pic_url: {
        type: String,
        default: process.env.PROFILE_PIC_URL
    },
    key: {
        type: String,
        required: true
    },
    accActive: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model("Staff", StaffSchema);
