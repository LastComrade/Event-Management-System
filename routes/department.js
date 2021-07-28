const router = require("express").Router();
const validate = require("../middleware/validation");
const deptCont = require("../controllers/deptCont");

router.route("/departments").get(deptCont.allIndex);

router
  .route("/department-create-101")
  .get(deptCont.index)
  .post(validate.deptCreate, deptCont.createDept);

router.route("/departments/:name").get(deptCont.finder);

router
  .route("/departments/:name/internship-register")
  .post(validate.internshipRegister, deptCont.internshipRegister);

// Exporting routes
module.exports = router;
