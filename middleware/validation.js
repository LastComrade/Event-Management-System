const { contactSchema, loginSchema } = require("../validation/schemas");
const ErrorHandler = require("../utils/errorHandler");

const validate = {
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
    staffLogin: (req, res, next) => {
        // console.log("This is staff validator");
        const { error } = loginSchema.validate(req.body);
        if (error) {
            next(ErrorHandler.validationError(error.message));
        }
        next();
    },
};

module.exports = validate;
