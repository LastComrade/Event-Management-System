const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Everything is same as contactSchema but the unique property as true in the username property 
// defines that no username in the DB can be same

const StaffSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // No same username can be there in the DB
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Staff", StaffSchema);
