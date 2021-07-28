const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const dboardCont = require("../../controllers/dashboardCont"); // Controller functions for staff-login routes
const authMid = require("../../middleware/auth");
const validate = require("../../middleware/validation");

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

// Exporting routes
module.exports = router;
