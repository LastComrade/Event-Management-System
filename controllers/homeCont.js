const Contact = require("../models/contact");
const ErrorHandler = require("../utils/errorHandler");

const homeCont = {
    index: (req, res) => {
        res.render("layouts/home");
    },

    contact: async (req, res, next) => {
        const { name, email, message } = req.body.contact;
        console.log(name, email, message);
        const contactData = new Contact(req.body.contact);
        await contactData.save();
        const confirmation_message = "All good";
        res.render("layouts/contact-confirmation", {
            message: confirmation_message,
            error: false,
        });
    },
};

module.exports = homeCont;
