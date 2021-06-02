const mongoose = require("mongoose"); // Using mongoose open-source npm package to work with mongoDB DataBase
const Schema = mongoose.Schema; // Using Schema class to create models and saving that models into the DB

// Schema is like an instance of the model that has to saved into the DB

// Contact Schema
const contactSchema = new Schema(
    {
        // Name is stored with type of string and it cant be undefined
        name: {
            type: String,
            required: true,
        },

        // Same for email
        email: {
            type: String,
            required: true,
        },

        // Same for message
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// creating the model of the schema and then exporting it
module.exports = mongoose.model("Contact", contactSchema);
