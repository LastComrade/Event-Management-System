const {
    contactSchema,
    loginSchema,
    deptSchema,
    eventSchema,
    newsletterSchema,
} = require("../validation/schemas"); // JOI schema to validate the from data on backend
const ErrorHandler = require("../utils/errorHandler"); // Error handler

const validate = {
    // Validates the contact form data and if an error is encountered then that error is also handled
    contact: (req, res, next) => {
        try {
            // console.log("This is contact valiator");
            const { error } = contactSchema.validate(req.body.contact);
            if (error) {
                next(ErrorHandler.validationError(error.message));
            }
            next();
        } catch (err) {
            next(ErrorHandler.serverError());
        }
    },

    // Validates the admin-login form data and (if) errors are also handled
    staffLogin: (req, res, next) => {
        // console.log("This is staff validator");
        const { error } = loginSchema.validate(req.body);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },

    // This will validate department form data
    deptCreate: (req, res, next) => {
        // console.log("dept validator started");
        const { error } = deptSchema.validate(req.body.department);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },

    // This will validate events form data
    eventCreate: (req, res, next) => {
        const { error } = eventSchema.validate(req.body.event);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },

    // This will validate the newsletter email
    newsletter: (req, res, next) => {
        const { error } = newsletterSchema.validate(req.body.newsletter);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },
};

module.exports = validate;
