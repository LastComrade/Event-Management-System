const Contact = require("../models/contact"); // Contact schema
const ErrorHandler = require("../utils/errorHandler"); // Error handler class
const nodeMailer = require("nodemailer");
const { serverError } = require("../utils/errorHandler");

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
            // Nodemailer testing
            const transporter = nodeMailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_ID,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_ID,
                to: "konarklohat123456@gmail.com",
                subject: `Message from ${name}`,
                text: `${message} from ${email}`,
                html: `<h1>${name}</h1> <br><p>${message} <br>from ${email}</p>`,
            };

            transporter.sendMail(mailOptions, (error, data) => {
                if (error) {
                    console.log(error);
                    next(ErrorHandler(serverError()));
                } else {
                    console.log("Email sent: " + data.response);
                }
            });

            const contactData = new Contact(req.body.contact); // Creating instance of the contact model
            await contactData.save(); // Saving that instance onto the DB, which takes some time so await is used
            // res.render("layouts/contact-confirmation", {
            //     error: false,
            // });
            return res.status(200).json();
        } catch (err) {
            next(ErrorHandler.serverError()); // If try block encounters any error then error handler will come to play to make it look like generic server error
        }
    },
};

// Exporting homeCont object. To make it accessible to other files by requiring or importing it.
module.exports = homeCont;
