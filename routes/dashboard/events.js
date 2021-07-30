const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const dboardCont = require("../../controllers/dashboardCont"); // Controller functions for staff-login routes
const authMid = require("../../middleware/auth");
const validate = require("../../middleware/validation");

router
  .route("/dashboard/events")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.eventsIndex);

// For event create functionality
// get -> To render the event create form/page
// post -> For creating a new event in database and googlesheets
router
  .route("/dashboard/event-create")
  .get(authMid.authRequired, authMid.staffCheck, authMid.onlyEventManagement, dboardCont.createEventIndex)
  .post(
    authMid.authRequired,
    authMid.staffCheck,
    authMid.onlyEventManagement,
    validate.eventCreate,
    dboardCont.createEvent
  );

router
  .route("/dashboard/events/:name")
  // .get(authMid.authRequired, authMid.staffCheck);
  .get(authMid.authRequired, authMid.staffCheck, authMid.onlyEventManagement, dboardCont.eventDeleter);

router
  .route("/dashboard/events/:name/participants")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.eventParticipantsList
  );

router
  .route("/dashboard/events/:id/edit")
  .get(authMid.authRequired, authMid.staffCheck, authMid.onlyEventManagement, dboardCont.editEventInfo)
  .post(
    authMid.authRequired,
    authMid.staffCheck,
    authMid.onlyEventManagement,
    validate.eventCreate,
    dboardCont.updateEvent
  );

// Exporting routes
module.exports = router;
