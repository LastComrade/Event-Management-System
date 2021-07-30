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

module.exports.eventSuggestionSchema = Joi.object({
  name: Joi.string().trim().min(1).required().label("Name"),
  // minDomainSegments mean konarklohat123456@gmail.com has two segments i.e
  // (gmail.com) gmail and com which is good enough to pass the validation
  email: Joi.string()
    .required()
    .email({ tlds: { allow: ["org", "com", "net", "in"] } })
    .label("E-Mail"),
  description: Joi.string().trim().min(1).required().label("Event Description"),
});

module.exports.internshipRegisterSchema = Joi.object({
  name: Joi.string().trim().min(1).required().label("Name"),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: ["org", "com", "net", "in"] } })
    .label("E-Mail"),
  preferred_dept_1: Joi.string()
    .trim()
    .min(1)
    .label("1st Preferred Department"),
  preferred_dept_2: Joi.string()
    .trim()
    .min(1)
    .label("2nd Preferred Department"),
  description: Joi.string().trim().min(1).required().label("Description"),
});

module.exports.loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["org", "com", "net", "in"] } })
    .required()
    .label("Email"),
  password: Joi.string().required().label("Password"),
});

module.exports.deptSchema = Joi.object({
  name: Joi.string().required().label("Department Name"),
  tagline: Joi.string().required().label("Department Tagline"),
  description: Joi.string().required().label("Department Description"),
  recruiting: Joi.boolean().label("Recruiting"),
  featured: Joi.boolean().label("Featured"),
  members: Joi.array().items(Joi.string()),
  pic: Joi.string().required().trim().min(1),
});

module.exports.eventSchema = Joi.object({
  name: Joi.string().trim().min(1).required().label("Event Name"),
  description: Joi.string().required().label("Event Description"),
  tagline: Joi.string().required().label("Event Tagline"),
  event_poster: Joi.string().required().label("Event Poster"),
  event_pic: Joi.string().required().label("Event Picture"),
  category: Joi.string().required().label("Event Category"),
  featured: Joi.boolean().label("Featured"),
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
  hosts: Joi.array().max(4).items(Joi.object()),
  sponsors: Joi.array().max(4).items(Joi.object()),
});

module.exports.staffRegisterSchema = Joi.object({
  firstname: Joi.string().trim().min(1).required().label("First Name"),
  lastname: Joi.string().trim().min(1).required().label("Last Name"),
  email: Joi.string()
    .email({ tlds: { allow: ["org", "com", "net", "in"] } })
    .required()
    .label("Email"),
  department: Joi.string().required().trim().min(1).label("Department"),
  designation: Joi.string().required().trim().min(1).label("Designation"),
  description: Joi.string().trim().min(1).label("Description"),
  profile_pic_url: Joi.string().trim().allow("", null).empty(['', null]).default("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9tG_NFfmLde3aA3q3p2yib1KJslRRNlJQg&usqp=CAU").label("Profile URL"),
  key: Joi.string().required().trim().min(1).label("Registration Key"),
});

module.exports.staffPaswordRegisterSchema = Joi.object({
  password: Joi.string().trim().min(8).max(16).required().label("Password"),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

module.exports.profileSchema = Joi.object({
  firstname: Joi.string().trim().min(1).required().label("First Name"),
  lastname: Joi.string().trim().min(1).required().label("Last Name"),
  profile_pic_url: Joi.string().required().trim().min(1).label("Profile URL"),
  description: Joi.string().required().trim().min(1).label("Description"),
  sl_fb: Joi.string().required().trim().min(1).label("Facebook Social Link"),
  sl_ig: Joi.string().required().trim().min(1).label("Instagram Social Link"),
  sl_li: Joi.string().required().trim().min(1).label("LinkedIn Social Link"),
});

module.exports.emailSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["org", "com", "net", "in"] } })
    .required()
    .label("Email"),
});

module.exports.participantSchema = Joi.object({
  name: Joi.string().trim().min(1).required().label("Participant's Name"),
  email: Joi.string()
    .email({ tlds: { allow: ["org", "com", "net", "in"] } })
    .required()
    .label("Participant's Email"),
  college_name: Joi.string().required().label("Participant's College Name"),
  linkedin_account: Joi.string()
    .required()
    .label("Participant's College Roll Number"),
});

module.exports.newsletterSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["org", "com", "net", "in"] } })
    .required()
    .label("Email"),
});

module.exports.magazineSchema = Joi.object({
  id: Joi.string().hex().length(24).required().label("ID"),
});

module.exports.updatePasswordSchema = Joi.object({
  password: Joi.string().trim().min(8).max(16).required().label("Password"),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({ "any.only": "{{#label}} does not match" }),
});
