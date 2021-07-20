const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeptSchema = Schema(
    {
        name: {
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
        members: [Object],
        recruiting: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Department", DeptSchema);
