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

// For event create functionality
// get -> To render the event create form/page
// post -> For creating a new event in database and googlesheets
router
  .route("/dashboard/event-create")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.createEventIndex)
  .post(
    authMid.authRequired,
    authMid.staffCheck,
    validate.eventCreate,
    dboardCont.createEvent
  );

router
  .route("/dashboard/events/:name")
  // .get(authMid.authRequired, authMid.staffCheck);
  .delete(authMid.authRequired, authMid.staffCheck, dboardCont.eventDeleter);

router
  .route("/dashboard/events/:name/participants")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.eventParticipantsList
  );

router
  .route("/dashboard/events/:id/edit")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.editEventInfo)
  .post(
    authMid.authRequired,
    authMid.staffCheck,
    validate.eventCreate,
    dboardCont.updateEvent
  );

router
  .route("/dashboard/department")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.departmentsRetriver
  );

router
  .route("/dashboard/departments/:name")
  .delete(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.departmentDeleter
  );

router
  .route("/dashboard/departments/:name/edit")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.editDeptInfo)
  .put(
    authMid.authRequired,
    authMid.staffCheck,
    validate.deptCreate,
    dboardCont.updateDept
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
  .route("/dashboard/participants/:id")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.pidEventRetriver);

router
  .route("/dashboard/board")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.boardIndex);

router
  .route("/dashboard/contact-messages")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.contactMessageIndex
  );

router
  .route("/dashboard/contact-messages/all")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.allContactMessages);

router
  .route("/dashboard/messages/contact/:id")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.idContactMessage);

router
  .route("/dashboard/internship-applications")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.internshipApplicationIndex
  );

router
  .route("/dashboard/internship-applications/all")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.allInternshipMessages
  );

router
  .route("/dashboard/internship-applications/:id")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.idInternshipMessage
  );

router
  .route("/dashboard/magazine-subscribers")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.magazineSubsIndex);

// protected route to genetrate the register key
router
  .route("/dashboard/generate-key")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.registerKeyIndex);

router
  .route("/dashboard/generate-key/create")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    dboardCont.registerKeyGenerator
  );

router
  .route("/dashboard/profile")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.profileIndex);

router
  .route("/dashboard/profile/edit")
  .post(authMid.authRequired, authMid.staffCheck, validate.profileUpdate, dboardCont.profileEdit);

// Exporting routes
module.exports = router;
