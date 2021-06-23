const Contact = require("../models/contact"); // Contact schema
const Newsletter = require("../models/newsletter"); // Newsletter schema
const ErrorHandler = require("../utils/errorHandler"); // Error handler class
const nodeMailer = require("nodemailer");

const homeCont = {
    // Index controller render the home page from layout section in views folder
    index: (req, res) => {
        res.render("layouts/home-new"); // res means response and render is another function applied on this res object which renders the html page
    },

    // Contact controller is an async function which saves contact data onto the DB which requires the functionality of await keyword
    contact: async (req, res, next) => {
        try {
            // console.log(req.body);
            const { name, email, message } = req.body; // Destructuring data out of contact object

            // Nodemailer Transport
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
                    next(ErrorHandler.serverError());
                } else {
                    return res.status(200).json({
                        message: "Message sent successfully! We will get back to you ASAP"
                    });
                }
            });
        } catch (err) {
            next(ErrorHandler.serverError()); // If try block encounters any error then error handler will come to play to make it look like generic server error
        }
    },

    newsletter: async (req, res) => {
        try {
            const { email } = req.body.newsletter;
            await Newsletter.findOne({ email }, async (err, existingEmail) => {
                if (err) {
                    next(ErrorHandler.serverError());
                } else if (existingEmail) {
                    return res.status(200).json({
                        message: "Entered E-Mail is already subscribed",
                    });
                } else {
                    const newNewsletter = new Newsletter({
                        email,
                    });
                    await newNewsletter.save();
                    return res.status(200).json({
                        message: "Successfully Subscribed",
                    });
                }
            });
        } catch (err) {
            console.log(err);
            next(ErrorHandler.serverError());
        }
    },
};

// Exporting homeCont object. To make it accessible to other files by requiring or importing it.
module.exports = homeCont;
