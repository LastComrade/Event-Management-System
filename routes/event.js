const router = require("express").Router();
const validate = require("../middleware/validation");
const eventCont = require("../controllers/eventCont");

router.route("/events").get(eventCont.eventIndex);

router.route("/events/live/all").get(eventCont.liveEventsRetriver);

router.route("/events/ongoing/all").get(eventCont.ongoingEventsRetriver);

router.route("/events/upcoming/all").get(eventCont.upcomingEventsRetriver);

router.route("/events/archived/all").get(eventCont.archivedEventsRetriver);

router
  .route("/events-suggestion")
  .post(validate.eventSuggestion, eventCont.eventSuggest);

router
  .route("/events/:name")
  .get(eventCont.finder)
  .post(validate.participantRegister, eventCont.registerParticipant);

// Exporting routes
module.exports = router;
