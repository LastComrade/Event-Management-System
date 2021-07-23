const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const dboardCont = require("../controllers/dashboardCont"); // Controller functions for staff-login routes
const authMid = require("../middleware/auth");
const validate = require("../middleware/validation");

// Staff Dashboard
router
  .route("/dashboard")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.staffDashboard);

router
  .route("/dashboard/events")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.eventsIndex);

router
  .route("/dashboard/events/:name/participants")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.eventParticipantsList);

router
  .route("/dashboard/events/:name/edit")
  .get(dboardCont.editEventInfo)
  .put(validate.eventCreate, dboardCont.updateEvent);

router
  .route("/dashboard/departments")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.departmentsRetriver
  );

router
  .route("/dashboard/magazine-subs")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.magazineRecieversRetriver
  );

router
  .route("/dashboard/participants")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.participantsRetriver
  );

router
  .route("/dashboard/board")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.boardIndex);
router
  .route("/dashboard/messages")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.messageIndex);

router
  .route("/dashboard/messages/contact-messages")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.contactMessages);

router
  .route("/dashboard/messages/internship-applications")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.internshipMessages);

router
  .route("/dashboard/messages/magazine-subscribers")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.magazineSubsIndex);

router
  .route("/dashboard/messages/contact/:id")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.idContactMessage);

router
  .route("/dashboard/messages/internship/:id")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.idInternshipMessage
  );

// protected route to genetrate the register key
router
  .route("/dashboard/reg-key-gen/refresh-101")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.registerKeyGenerator
  );

// Exporting routes
module.exports = router;
