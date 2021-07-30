const {
    contactSchema,
    loginSchema,
    deptSchema,
    eventSchema,
    participantSchema,
    newsletterSchema,
    magazineSchema,
    staffRegisterSchema,
    staffPaswordRegisterSchema,
    profileSchema,
    emailSchema,
    updatePasswordSchema,
    eventSuggestionSchema,
    internshipRegisterSchema,
} = require("../validation/schemas"); // JOI schema to validate the from data on backend
const ErrorHandler = require("../utils/errorHandler"); // Error handler

const validate = {
    // Validates the contact form data and if an error is encountered then that error is also handled
    contact: (req, res, next) => {
        try {
            // console.log(req.body);
            // console.log("This is contact valiator");
            const { error } = contactSchema.validate(req.body);
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
        // console.log(req.body);
        // console.log("This is staff validator");
        const { error } = loginSchema.validate(req.body);
        if (error) {
            req.flash("error", error.message);
            return res.redirect("back");
            // next(ErrorHandler.validationError(error.message));
        }
        next();
    },

    // This will validate department form data
    deptCreate: (req, res, next) => {
        // console.log("dept validator started");
        const { error } = deptSchema.validate(req.body);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },

    // This will validate events form data
    eventCreate: (req, res, next) => {
        const { error } = eventSchema.validate(req.body);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },

    // This will validate participant form data
    participantRegister: (req, res, next) => {
        const { error } = participantSchema.validate(req.body);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },

    // This will validate the newsletter email
    newsletter: (req, res, next) => {
        const { error } = newsletterSchema.validate(req.body);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },

    eventSuggestion: (req, res, next) => {
        const { error } = eventSuggestionSchema.validate(req.body);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },

    magazineEmail: (req, res, next) => {
        const { error } = newsletterSchema.validate(req.body);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },

    magazine: (req, res, next) => {
        const { error } = magazineSchema.validate(req.params);
        if (error) {
            req.flash("error", "Not Valid");
            return res.redirect("/");
        }
        next();
    },

    staffRegister: (req, res, next) => {
        const { error } = staffRegisterSchema.validate(req.body);
        if (error) {
            // next(ErrorHandler.validationError(error.message));
            req.flash("error", error.message);
            return res.redirect("/staff-register");
        } else {
            next();
        }
    },

    staffPasswordRegister: (req, res, next) => {
        const { error } = staffPaswordRegisterSchema.validate(req.body);
        if (error) {
            req.flash("error", error.message);
            return res.redirect("back");
            // next(ErrorHandler.validationError(error.message));
        } else {
            next();
        }
    },

    profileUpdate: (req, res, next) => {
        const { error } = profileSchema.validate(req.body);
        if (error) {
            req.flash("error", error.message);
            return res.redirect("/staff-register");
        } else {
            next();
        }
    },

    email: (req, res, next) => {
        const { error } = emailSchema.validate(req.body);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },

    updatePassword: (req, res, next) => {
        const { error } = updatePasswordSchema.validate(req.body);
        if (error) {
            req.flash("error", error.message);
            return res.redirect("back");
            // next(ErrorHandler.validationError(error.message));
        } else {
            next();
        }
    },

    internshipRegister: (req, res, next) => {
        const { error } = internshipRegisterSchema.validate(req.body);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        } else {
            next();
        }
    },
};

module.exports = validate;
