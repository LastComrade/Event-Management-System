const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const validate = require("../middleware/validation"); // Joi validaiton for contact and staffLogin
const deptCont = require("../controllers/deptCont");


// Render all the departments
router.route("/departments").get(deptCont.allIndex);

// For department create functionality
// get -> To render the department create form/page
// post -> For creating the new department in database
router
    .route("/department-create-101")
    .get(deptCont.index)
    .post(validate.deptCreate, deptCont.createDept);

// To render department page for only a single department based on it's name
router
    .route("/departments/:name")
    .get(deptCont.finder);

router.route("/departments/:name/internship-register").post(validate.internshipRegister, deptCont.internshipRegister);

// Exporting routes
module.exports = router;