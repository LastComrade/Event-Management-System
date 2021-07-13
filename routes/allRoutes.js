const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const validate = require("../middleware/validation"); // Joi validaiton for contact and staffLogin
const homeCont = require("../controllers/homeCont"); // Controller functions for home routes
const staffCont = require("../controllers/staffCont"); // Controller functions for staff-login routes
const deptCont = require("../controllers/deptCont");
const eventCont = require("../controllers/eventCont");
const authMid = require("../middleware/auth");

// Whenever "/" -> root route is initiated with a GET request then homeCont.index function will run
// Whenever "/" -> root route is initiated with a POST request then validate.contact and homeCont.contact function will run
// See below route to better understand
router.route("/").get(homeCont.index).post(validate.contact, homeCont.contact);

// Staff Authentication Routes

// 1. Registration of the staff
router
    .route("/staff-register")
    .get(staffCont.staffRegisterPage)
    .post(validate.staffRegister, staffCont.staffRegister);

// 2. Activation of the staff member
router.route("/staff-account/activation/:token").get(staffCont.staffActivation);

// 3. After the email is verified, member can set their password
router
    .route("/staff-password-register")
    .post(validate.staffPasswordRegister, staffCont.staffPasswordRegister);

// 4. Staff member will be redirected to the login page
router
    .route("/staff-login")
    .get(staffCont.staffLoginPage)
    .post(validate.staffLogin, staffCont.staffLogin);

// Staff Dashboard
router
    .route("/staff-dashboard")
    .get(authMid.authRequired, authMid.staffCheck, staffCont.staffDashboard);

// Staff logout
router.route("/staff-logout").get(authMid.authRequired, staffCont.staffLogout);

// 5. Forgot password route
router
    .route("/forgot-password")
    .get(staffCont.staffPasswordResetPage)
    .post(validate.email, staffCont.forgotPassword);

// 6. Reset password route
router
    .route("/password-reset/:token")
    .get(staffCont.staffActualPasswordResetPage)
    .post(
        validate.updatePassword,
        staffCont.resetPasswordTokenCheck,
        staffCont.updatePassword
    );

// Protected Routes
router
    .route("/department-create-101")
    .get(deptCont.index)
    .post(validate.deptCreate, deptCont.createDept);

router
    .route("/event-create-101")
    .get(eventCont.index)
    .post(validate.eventCreate, eventCont.createEvent);

router
    .route("/events/:name")
    .get(eventCont.finder)
    .post(validate.participantRegister, eventCont.registerParticipant);

router.route("/departments/:name").get(deptCont.finder);

router.route("/newsletter-sub").post(validate.newsletter, homeCont.newsletter);



// Exporting routes
module.exports = router;
