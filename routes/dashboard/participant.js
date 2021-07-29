const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const dboardCont = require("../../controllers/dashboardCont"); // Controller functions for staff-login routes
const authMid = require("../../middleware/auth");

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

// Exporting routes
module.exports = router;
