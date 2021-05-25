const { contactSchema, loginSchema } = require("../validation/schemas");
const ExpressError = require("../utils/ExpressError");

module.exports.validateContact = (req, res, next) => {
    console.log("This is contact valiator");
    try {
        const { error } = contactSchema.validate(req.body.contact);
        if (error) {
            const confirmation_message = error.details
                .map((el) => el.message)
                .join(", ");
            console.log(error);
            return res.render("layouts/contact-confirmation", {
                message: confirmation_message,
                error: true,
            });
        }
    } catch(err) {
        console.log(err.message);
        return res.json({
            message: err.message,
        })
    }
    next();
};

module.exports.validateStaffLogin = (req, res, next) => {
    console.log("This is a staff validator");
    try {
        const {error} = loginSchema.validate(req.body);
        if(error) {
            res.send("Not good!");
        }
    } catch(err) {
        console.log(err.message);
        return res.json({
            message: err.message,
        })
    }
    next();
}