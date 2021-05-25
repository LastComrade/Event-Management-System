const baseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        "string.escapeHTML": "{{#label}} must not include HTML!",
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value)
                    return helpers.error("string.escapeHTML", { value });
                return clean;
            },
        },
    },
});

const Joi = baseJoi.extend(extension);

module.exports.contactSchema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email({
        minDomainSegments: 2,
    }).label("E-Mail"),
    message: Joi.string().required().label("Message"),
});

module.exports.loginSchema = Joi.object({
    username: Joi.string().required().label("Userame"),
    password: Joi.string().required().label("Password"),
});
