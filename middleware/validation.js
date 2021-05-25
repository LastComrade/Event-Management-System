const { contactSchema, loginSchema } = require("../validation/schemas");
const ErrorHandler = require("../utils/errorHandler");

module.exports.validateContact = (req, res, next) => {
    // console.log("This is contact valiator");
    const { error } = contactSchema.validate(req.body.contact);
    if (error) {
        next(ErrorHandler.validationError(error.message));
    }
    next();
};

module.exports.validateStaffLogin = (req, res, next) => {
    console.log("This is a staff validator");
    const { error } = loginSchema.validate(req.body);

    next();
};
