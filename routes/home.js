const express = require("express");
const router = express.Router();
const { validateContact, validateStaffLogin } = require("../middleware/validation");
const homeCont = require("../controllers/homeCont");

router.route("/").get(homeCont.index).post(validateContact, homeCont.contact);

router.route("/staff-login").get(homeCont.staffLogin).post(validateStaffLogin, homeCont.checkStaff);

module.exports = router;
