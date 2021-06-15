const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const validate = require("../middleware/validation"); // Joi validaiton for contact and staffLogin
const homeCont = require("../controllers/homeCont"); // Controller functions for home routes
const staffCont = require("../controllers/staffCont"); // Controller functions for staff-login routes
const deptCont = require("../controllers/deptCont");
const eventCont = require("../controllers/eventCont");

// Whenever "/" -> root route is initiated with a GET request then homeCont.index function will run
// Whenever "/" -> root route is initiated with a POST request then validate.contact and homeCont.contact function will run
// See below route to better understand
router.route("/").get(homeCont.index).post(validate.contact, homeCont.contact);

// Same way for "/staff-login" route
router
    .route("/staff-login")
    .get(staffCont.staffLogin)
    .post(validate.staffLogin, staffCont.checkStaff);

router
    .route("/department-create-101")
    .get(deptCont.index)
    .post(validate.deptCreate, deptCont.createDept);

router
    .route("/event-create-101")
    .get(eventCont.index)
    .post(validate.eventCreate, eventCont.createEvent);

router
    .route("/events/:name")
    .get(eventCont.finder);

router
    .route("/departments/:name")
    .get(deptCont.finder);

router.route("/newsletter-sub")
.post(validate.newsletter, homeCont.newsletter)

// Exporting routes
module.exports = router;
