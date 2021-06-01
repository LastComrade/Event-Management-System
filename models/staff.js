const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Everything is same as contactSchema but the unique property as true in the username property 
// defines that no username in the DB can be same

const StaffSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        unique: true, // No same username can be there in the DB
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "member"
    },
    designation: {
        type: String,
        required: true
    },
    profile_pic_url: {
        type: String,
        default: process.env.PROFILE_PIC_URL
    }
});

module.exports = mongoose.model("Staff", StaffSchema);
