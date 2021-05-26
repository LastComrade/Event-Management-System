const Contact = require("../models/contact"); // Contact schema
const ErrorHandler = require("../utils/errorHandler"); // Error handler class

const homeCont = {
    // Index controller render the home page from layout section in views folder
    index: (req, res) => {
        res.render("layouts/home"); // res means response and render is another function applied on this res object which renders the html page
    },

    // Contact controller is an async function which saves contact data onto the DB which requires the functionality of await keyword
    contact: async (req, res, next) => {
        try {
            const { name, email, message } = req.body.contact; // Destructuring data out of contact object
            console.log(name, email, message);
            const contactData = new Contact(req.body.contact); // Creating instance of the contact model
            await contactData.save(); // Saving that instance onto the DB, which takes some time so await is used
            res.render("layouts/contact-confirmation", {
                error: false,
            });
        } catch (err) {
            next(ErrorHandler.serverError()); // If try block encounters any error then error handler will come to play to make it look like generic server error
        }
    },
};

// Exporting homeCont object. To make it accessible to other files by requiring or importing it.
module.exports = homeCont; 
