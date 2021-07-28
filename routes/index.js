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

router.route("/newsletter-sub").post(validate.newsletter, homeCont.newsletter);

// Monthly Magazine subscription route
router
  .route("/monthly-magazine")
  .post(validate.magazineEmail, homeCont.registerMagazineEmail);

// Monthly Magazine unsubscribe route
router
  .route("/monthly-magazine/unsubscribe/:id")
  .post(validate.magazine, homeCont.unSubMagazineEmail);

router.route("/credits").get(homeCont.creditIndex);

// Exporting routes
module.exports = router;
