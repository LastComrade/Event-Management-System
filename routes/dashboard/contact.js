const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const dboardCont = require("../../controllers/dashboardCont"); // Controller functions for staff-login routes
const authMid = require("../../middleware/auth");

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
  .route("/dashboard/contact-messages/:id")
  .get(authMid.authRequired, authMid.staffCheck, authMid.teamLeaderLevelAuth, dboardCont.idContactMessage);

// Exporting routes
module.exports = router;
