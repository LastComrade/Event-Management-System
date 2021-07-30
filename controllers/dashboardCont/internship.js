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

const internship = {
  internshipApplicationIndex: async (req, res, next) => {
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
          let internshipMessages;
          if (res.locals.staff && res.locals.staff.role !== "member") {
            internshipMessages = await Internship.find().limit(10).sort({updatedAt: -1});
          } else {
            internshipMessages = await Internship.find()
              .limit(10)
              .select("-email")
              .sort({updatedAt: -1});
          }
          // const internshipMessages = await Internship.find()
          //   .sort({ createdAt: -1 })
          //   .limit(10);
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: "Dashboard | Internship Applications",
            internshipMessages,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong. Please try again later");
      return res.redirect("/dashboard");
    }
  },

  allInternshipMessages: async (req, res, next) => {
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
          let internshipMessages;
          if (res.locals.staff && res.locals.staff.role !== "member") {
            internshipMessages = await Internship.find().sort({updatedAt: -1});
          } else {
            internshipMessages = await Internship.find().select("-email").sort({updatedAt: -1});
          }
          // console.log(internshipall-messages);
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: `Dashboard | Internship Applications | All`,
            internshipMessages,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong. Please try again later");
      return res.redirect("/dashboard");
    }
  },

  idInternshipMessage: async (req, res, next) => {
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
          const internshipMessage = await Internship.findOne({
            _id: req.params.id,
          });
          // console.log(internshipMessage);
          return res.render("layouts/dashboard/messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: `Dashboard | Internship Applications | ${internshipMessage.name}`,
            internshipMessage,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong. Please try again later");
      return res.redirect("/dashboard");
    }
  },
};

module.exports = internship;
