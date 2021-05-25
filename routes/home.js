const express = require("express");
const router = express.Router();
const CatchAsync = require("../utils/CatchAsync");
const ExpressError = require("../utils/ExpressError.js");
const { validateContact, validateStaffLogin } = require("../middleware/validation");
const home = require("../controllers/homeCont");

router.route("/").get(home.index).post(validateContact, home.contact);

router.route("/staff-login").get(home.staffLogin).post(validateStaffLogin, home.checkStaff);

module.exports = router;
