const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const validate = require("../middleware/validation"); // Joi validaiton for contact and staffLogin
const homeCont = require("../controllers/homeCont"); // Controller functions for home routes
const staffCont = require("../controllers/staffCont"); // Controller functions for staff-login routes
const deptCont = require("../controllers/deptCont");
const eventCont = require("../controllers/eventCont");
const authMid = require("../middleware/auth");


// For event create functionality
// get -> To render the event create form/page
// post -> For creating a new event in database and googlesheets
router
    .route("/event-create-101")
    .post(validate.eventCreate, eventCont.createEvent); 

router.route("/event-landing").get(eventCont.eventIndex);

// To render indivizual events via event page
// get -> To render the page
// post -> For registering participants in an event
router
    .route("/events/:name")
    .get(eventCont.finder)
    .post(validate.participantRegister, eventCont.registerParticipant);

// Exporting routes
module.exports = router;