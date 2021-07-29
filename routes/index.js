const router = require("express").Router();
const auth = require("./auth");
const department = require("./department");
const eventRoutes = require("./event");
const dashboard = require("./dashboard");
const home = require("./home");

router.use("/", auth);
router.use("/", department);
router.use("/", eventRoutes);
router.use("/", dashboard);
router.use("/", home);

// Exporting routes
module.exports = router;
