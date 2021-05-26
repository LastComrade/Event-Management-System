const express = require("express");
const router = express.Router();
const { validateContact, validateStaffLogin } = require("../middleware/validation");
const homeCont = require("../controllers/homeCont");
const staffCont = require("../controllers/staffCont");

router.route("/").get(homeCont.index).post(validateContact, homeCont.contact);

router.route("/staff-login").get(staffCont.staffLogin).post(validateStaffLogin, staffCont.checkStaff);

module.exports = router;
