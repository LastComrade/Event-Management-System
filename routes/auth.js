const router = require("express").Router();
const validate = require("../middleware/validation");
const staffCont = require("../controllers/staffCont");
const authMid = require("../middleware/auth");

router
  .route("/staff-register")
  .get(staffCont.staffRegisterPage)
  .post(validate.staffRegister, staffCont.staffRegister);

router
  .route("/staff-login")
  .get(staffCont.staffLoginPage)
  .post(validate.staffLogin, staffCont.staffLogin);

router
  .route("/staff-password-register")
  .post(validate.staffPasswordRegister, staffCont.staffPasswordRegister);

router.route("/staff-logout").get(authMid.authRequired, staffCont.staffLogout);

router
  .route("/forgot-password")
  .get(staffCont.staffPasswordResetPage)
  .post(validate.email, staffCont.forgotPassword);

router.route("/staff-account/activation/:token").get(staffCont.staffActivation);

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
