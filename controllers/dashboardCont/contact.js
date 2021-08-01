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

const contact = {
  contactMessageIndex: async (req, res, next) => {
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
          let contactMessages;
          if (res.locals.staff && res.locals.staff.role !== "member") {
            contactMessages = await Contact.find()
              .limit(10)
              .sort({ createdAt: -1 });
          } else {
            contactMessages = await Contact.find()
              .limit(10)
              .select("-email")
              .sort({ createdAt: -1 });
          }
          // const internshipMessages = await Internship.find().limit(10);
          // const magazineSubs = await magazineReciever
          //   .find({ subscribed: true })
          //   .limit(10);
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: "Dashboard | Contact Messages",
            contactMessages,
            // internshipMessages,
            // magazineSubs,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  allContactMessages: async (req, res, next) => {
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
          let contactMessages;
          if (res.locals.staff && res.locals.staff.role !== "member") {
            contactMessages = await Contact.find().sort({ createdAt: -1 });
          } else {
            contactMessages = await Contact.find()
              .select("-email")
              .sort({ createdAt: -1 });
          }
          // console.log(contactMessages)
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: `Dashboard | Contact Messages | All`,
            contactMessages,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  idContactMessage: async (req, res, next) => {
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
          const contactMessage = await Contact.findOne({
            _id: req.params.id,
          });
          // console.log(contactMessage);
          return res.render("layouts/dashboard/messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: `Dashboard | Contact Message | ${contactMessage.name}`,
            contactMessage,
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

module.exports = contact;
