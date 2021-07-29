const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const dboardCont = require("../../controllers/dashboardCont"); // Controller functions for staff-login routes
const authMid = require("../../middleware/auth");
const validate = require("../../middleware/validation");

router
  .route("/dashboard/department")
  .get(
    authMid.authRequired,
    authMid.staffCheck,
    authMid.teamLeaderLevelAuth,
    dboardCont.departmentRetriver
  );

router
  .route("/dashboard/departments/:name")
  .delete(
    authMid.authRequired,
    authMid.staffCheck,
    authMid.presidentLevelAuth,
    dboardCont.departmentDeleter
  );

router
  .route("/dashboard/department/:id/edit")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.editDeptInfo)
  .post(
    authMid.authRequired, 
    authMid.staffCheck,
    authMid.teamLeaderLevelAuth,
    validate.deptCreate,
    dboardCont.updateDept
  );

// Exporting routes
module.exports = router;
