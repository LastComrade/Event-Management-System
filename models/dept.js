const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const DeptSchema = Schema({
    dept_name: {
        type: String,
        required: true,
    },
    tagline: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "staff",
        },
    ],
    recruiting: {
        type: Boolean,
        default: false,
    },
    dept_head: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Department", DeptSchema);
