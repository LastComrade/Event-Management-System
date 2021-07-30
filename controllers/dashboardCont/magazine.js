const Staff = require("../../models/staff");
const ErrorHandler = require("../../utils/errorHandler");
const jwt = require("jsonwebtoken");
const Event = require("../../models/event");
const Dept = require("../../models/dept");
const Participant = require("../../models/participant");
const registerKey = require("../../models/regKey");
const Magazines = require("../../models/magazine-reciever");
const Contact = require("../../models/contact");
const uuid = require("uuid");
const Internship = require("../../models/internship");
const magazineReciever = require("../../models/magazine-reciever");
const moment = require("moment");
const { google } = require("googleapis");
const RegKey = require("../../models/regKey");

const magazine = {
  magazineSubsIndex: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const staffCount = await Staff.countDocuments();
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          // const magazineSubs = await magazineReciever.find({
          //   subscribed: true,
          // });
          let magazineSubs;
          if (res.locals.staff && res.locals.staff.role !== "member") {
            magazineSubs = await magazineReciever.find({
              subscribed: true,
            });
          } else {
            magazineSubs = await magazineReciever
              .find({
                subscribed: true,
              })
              .select("-email");
          }
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: "Dashboard | Magazine Subscribers",
            magazineSubs,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },
};

module.exports = magazine;
