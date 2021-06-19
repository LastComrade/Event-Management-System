const baseJoi = require("joi"); // JOI validation NPM package read the docs for more info
const sanitizeHtml = require("sanitize-html"); // To sanitize any type of html like <script> tags with malacious code

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

// Giving base joi package an extension order to also sanitize html with "sanitize-html" package
const Joi = baseJoi.extend(extension);

// Directly exporting the functions

module.exports.contactSchema = Joi.object({
    name: Joi.string().required().label("Name"),
    // minDomainSegments mean konarklohat123456@gmail.com has two segments i.e
    // (gmail.com) gmail and com which is good enough to pass the validation
    email: Joi.string()
        .required()
        .email({ tlds: { allow: ["org", "com", "net", "in"] } })
        .label("E-Mail"),
    message: Joi.string().required().label("Message"),
});

module.exports.loginSchema = Joi.object({
    username: Joi.string().required().label("Userame"),
    password: Joi.string().required().label("Password"),
});

module.exports.deptSchema = Joi.object({
    name: Joi.string().required().label("department name"),
    tagline: Joi.string().required().label("department tagline"),
    description: Joi.string().required().label("department description"),
    recruiting: Joi.boolean().label("it should be a true or false"),
    members: Joi.array().items(Joi.object()),
});

module.exports.eventSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .required()
        .label("Event Name"),
    description: Joi.string().required().label("Event Description"),
    category: Joi.string().required().label("Event Category"),
    registration_starts: Joi.date()
        .iso()
        .required()
        .label("Registration Start Date"),
    registration_ends: Joi.date()
        .iso()
        .min(Joi.ref("registration_starts"))
        .required()
        .label("Registration End Date"),
    event_starts: Joi.date()
        .iso()
        .min(Joi.ref("registration_ends"))
        .required()
        .label("Event Start Date"),
    event_ends: Joi.date()
        .iso()
        .min(Joi.ref("event_starts"))
        .label("Event End Date"),
    result_declaration: Joi.date()
        .iso()
        .min(Joi.ref("event_ends"))
        .label("Event Result Declaration Date"),
    organizers: Joi.array().items(Joi.object()),
});

module.exports.participantSchema = Joi.object({
    firstname: Joi.string()
        .trim()
        .min(1)
        .required()
        .label("Participant's Firstname"),
    lastname: Joi.string()
        .required()
        .trim()
        .min(1)
        .label("Participant's Lastname"),
    email: Joi.string()
        .email({ tlds: { allow: ["org", "com", "net", "in"] } })
        .required()
        .label("Participant's Email"),
    college_name: Joi.string()
        .required()
        .label("Participant's College Name"),
    crn: Joi.string()
        .required()
        .label("Participant's College Roll Number"),
});

module.exports.newsletterSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: ["org", "com", "net", "in"] } })
        .required()
        .label("Newsletter Email"),
});
