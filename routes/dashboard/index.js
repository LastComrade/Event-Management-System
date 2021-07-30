const router = require("express").Router();
const dboardCont = require("../../controllers/dashboardCont/index");
const authMid = require("../../middleware/auth");
const contact = require("./contact");
const events = require("./events");
const board = require("./board");
const department = require("./department");
const internship = require("./internship");
const keyGenerate = require("./key-generate");
const magSubs = require("./mag-subs");
const participant = require("./participant");
const profile = require("./profile");

// Staff Dashboard
router
  .route("/dashboard")
  .get(authMid.authRequired, authMid.staffCheck, dboardCont.staffDashboard);

router.use("/", contact);
router.use("/", events);
router.use("/", board);
router.use("/", department);
router.use("/", internship);
router.use("/", keyGenerate);
router.use("/", magSubs);
router.use("/", participant);
router.use("/", profile);

// Exporting routes
module.exports = router;

