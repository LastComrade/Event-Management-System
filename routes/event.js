const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const validate = require("../middleware/validation"); // Joi validaiton for contact and staffLogin
const homeCont = require("../controllers/homeCont"); // Controller functions for home routes
const staffCont = require("../controllers/staffCont"); // Controller functions for staff-login routes
const deptCont = require("../controllers/deptCont");
const eventCont = require("../controllers/eventCont");
const authMid = require("../middleware/auth");

// For event page containing all the events
// get -> To render the page
router.route("/events")
    .get(eventCont.eventIndex);

// To render indivizual events via event page
// get -> To render the page
// post -> For registering participants in an event
router
    .route("/events/:name")
    .get(eventCont.finder)
    .post(validate.participantRegister, eventCont.registerParticipant);

router.route("/events-suggestion").post(validate.eventSuggestion, eventCont.eventSuggest)

// Exporting routes
module.exports = router;