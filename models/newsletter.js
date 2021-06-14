const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsletterSchema = Schema(
    {
        email: {
            type: String,
            required: true,
        },
        
        subscribe: {
            type: Boolean,
            default: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Newsletter", NewsletterSchema);
