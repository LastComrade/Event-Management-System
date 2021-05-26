const Contact = require("../models/contact"); // Contact schema
const ErrorHandler = require("../utils/errorHandler");

const homeCont = {
    index: (req, res) => {
        res.render("layouts/home");
    },

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
            next(ErrorHandler.serverError());
        }
    },
};

module.exports = homeCont;
