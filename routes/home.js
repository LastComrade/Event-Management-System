const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation");
const homeCont = require("../controllers/homeCont");
const staffCont = require("../controllers/staffCont");

router.route("/").get(homeCont.index).post(validate.contact, homeCont.contact);

router.route("/staff-login").get(staffCont.staffLogin).post(validate.staffLogin, staffCont.checkStaff);

module.exports = router;