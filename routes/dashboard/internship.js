const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const dboardCont = require("../../controllers/dashboardCont"); // Controller functions for staff-login routes
const authMid = require("../../middleware/auth");

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
    authMid.teamLeaderLevelAuth,
    dboardCont.idInternshipMessage
  );

// Exporting routes
module.exports = router;
