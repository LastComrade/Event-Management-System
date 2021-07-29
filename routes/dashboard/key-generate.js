const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const dboardCont = require("../../controllers/dashboardCont"); // Controller functions for staff-login routes
const authMid = require("../../middleware/auth");

// protected route to genetrate the register key
router
  .route("/dashboard/generate-key")
  .get(authMid.authRequired, authMid.staffCheck, authMid.presidentLevelAuth, dboardCont.registerKeyIndex);

router
  .route("/dashboard/generate-key/create")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    authMid.presidentLevelAuth,
    dboardCont.registerKeyGenerator
  );

// Exporting routes
module.exports = router;
