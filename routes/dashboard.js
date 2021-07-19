const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const dboardCont = require("../controllers/dashboardCont"); // Controller functions for staff-login routes
const authMid = require("../middleware/auth");

// Staff Dashboard
router
    .route("/dashboard")
    .get(authMid.authRequired, authMid.staffCheck, dboardCont.staffDashboard);

router
    .route("/dashboard/events")
    .get(authMid.authRequired, authMid.staffCheck, dboardCont.eventsRetriver);

router
    .route("/dashboard/departments")
    .get(authMid.authRequired, authMid.staffCheck, dboardCont.departmentsRetriver);

router
    .route("/dashboard/magazine-subs")
    .get(authMid.authRequired, authMid.staffCheck, dboardCont.magazineRecieversRetriver);

router
    .route("/dashboard/participants")
    .get(authMid.authRequired, authMid.staffCheck, dboardCont.participantsRetriver);

router.route("/dashboard/board").get(authMid.authRequired, authMid.staffCheck, dboardCont.boardIndex);
router.route("/dashboard/message").get(authMid.authRequired, authMid.staffCheck, dboardCont.messageIndex);

// Exporting routes
module.exports = router;