const router = require("express").Router();
const validate = require("../middleware/validation");
const homeCont = require("../controllers/homeCont");

router.route("/").get(homeCont.index).post(validate.contact, homeCont.contact);

router.route("/newsletter-sub").post(validate.newsletter, homeCont.newsletter);

router
  .route("/monthly-magazine")
  .post(validate.magazineEmail, homeCont.registerMagazineEmail);

router
  .route("/monthly-magazine/unsubscribe/:id")
  .post(validate.magazine, homeCont.unSubMagazineEmail);

router.route("/credits").get(homeCont.creditIndex);

router.route("/feedback").post(validate.contact, homeCont.feedback);

// Exporting routes
module.exports = router;
