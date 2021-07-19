const mongoose = require("mongoose");

const RegisterKeySchema = mongoose.Schema({
    key: {
        type: String,
        unique: true,
        required: true
    },
    used: {
        type: Boolean,
        default: false
    },
    usedBy: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("RegisterKey", RegisterKeySchema);