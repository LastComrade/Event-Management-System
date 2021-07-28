const router = require("express").Router(); // Router is a function in the express which can be used to return an array of routes and methods
const validate = require("../middleware/validation"); // Joi validaiton for contact and staffLogin
const staffCont = require("../controllers/staffCont"); // Controller functions for staff-login routes
const authMid = require("../middleware/auth");

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

// Exporting routes
module.exports = router;
