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
    .route("/dashboard")
    .get(authMid.authRequired, authMid.staffCheck, staffCont.staffDashboard);

router
    .route("/dashboard/events")
    .get(authMid.authRequired, authMid.staffCheck, staffCont.eventsRetriver);

router
    .route("/dashboard/departments")
    .get(authMid.authRequired, authMid.staffCheck, staffCont.departmentsRetriver);

router
    .route("/dashboard/magazine-subs")
    .get(authMid.authRequired, authMid.staffCheck, staffCont.magazineRecieversRetriver);

router
    .route("/dashboard/participants")
    .get(authMid.authRequired, authMid.staffCheck, staffCont.participantsRetriver);

router.route("/board").get(authMid.authRequired, authMid.staffCheck, staffCont.boardIndex);
router.route("/message").get(authMid.authRequired, authMid.staffCheck, staffCont.messageIndex);

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

router.route("/departments").get(deptCont.allIndex);

// Protected Routes

// For department create functionality
// get -> To render the department create form/page
// post -> For creating the new department in database
router
    .route("/department-create-101")
    .get(deptCont.index)        
    .post(validate.deptCreate, deptCont.createDept);    

// For event create functionality
// get -> To render the event create form/page
// post -> For creating a new event in database and googlesheets
router
    .route("/event-create-101")
    .get(eventCont.index)       
    .post(validate.eventCreate, eventCont.createEvent);     

router.route("/event-landing").get(eventCont.eventIndex);

// To render indivizual events via event page
// get -> To render the page
// post -> For registering participants in an event
router
    .route("/events/:name")
    .get(eventCont.finder)
    .post(validate.participantRegister, eventCont.registerParticipant);

// To render department page for only a single department based on it's name
router
    .route("/departments/:name")
    .get(deptCont.finder);

router
    .route("/newsletter-sub")
    .post(validate.newsletter, homeCont.newsletter);

// Monthly Magazine subscription route
router
    .route("/monthly-magazine")
    .post(validate.magazineEmail, homeCont.registerMagazineEmail);

// Monthly Magazine unsubscribe route 
router
    .route("/monthly-magazine/unsubscribe/:id")
    .post(validate.magazine, homeCont.unSubMagazineEmail);

// Exporting routes
module.exports = router;
