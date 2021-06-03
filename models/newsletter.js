const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsletterSchema = Schema(
    {
        email: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Newsletter", NewsletterSchema);
