const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const dboardCont = require("../../controllers/dashboardCont"); // Controller functions for staff-login routes
const authMid = require("../../middleware/auth");
const validate = require("../../middleware/validation");

router
  .route("/dashboard/profile")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.profileIndex);

router
  .route("/dashboard/profile/edit")
  .post(
    authMid.authRequired,
    authMid.staffCheck,
    validate.profileUpdate,
    dboardCont.profileEdit
  );

// Exporting routes
module.exports = router;
