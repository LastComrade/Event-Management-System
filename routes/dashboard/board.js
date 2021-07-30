const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const dboardCont = require("../../controllers/dashboardCont/index"); // Controller functions for staff-login routes
const authMid = require("../../middleware/auth");

router
  .route("/dashboard/board")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.boardIndex);

// Exporting routes
module.exports = router;
