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

const participant = {
  participantsRetriver: async (req, res, next) => {
    // for retriving all the participants from the database
    // await Participant.find({}, async (err, participantsList) => {
    //   if (err) {
    //     console.log(
    //       `Error occur while retriving participants list from database`
    //     );
    //     req.flash("error", "An error occured while retriving participants");
    //     res.redirect("/staff-dashboard");
    //   } else {
    //     return res.json({
    //       participantsList,
    //     });
    //   }
    // });
    try {
      let participants;
      if (res.locals.staff && res.locals.staff.role !== "member") {
        participants = await Participant.find().sort({ updatedAt: -1 });
      } else {
        participants = await Participant.find()
          .select("-email")
          .sort({ updatedAt: -1 });
      }
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      // console.log(participants);
      return res.render("layouts/dashboard/participants", {
        error: req.flash("error"),
        success: req.flash("success"),
        title: "Dashboard | Participants",
        participants,
        staffCount,
        eventCount,
        deptCount,
        participantCount,
        moment,
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  pidEventRetriver: async (req, res, next) => {
    try {
      const participant = await Participant.findOne({
        _id: req.params.id,
      }).populate({
        path: "registered_events",
        options: {
          sort: {
            updatedAt: -1,
          },
        },
      });
      // console.log(participantsList);
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      // console.log("***********************************")
      // console.log(participant);
      // console.log("***********************************")
      // console.log(req.params.id)
      return res.render("layouts/dashboard/participant-events", {
        error: req.flash("error"),
        success: req.flash("success"),
        title: `Dashboard | Participants | ${participant.name} | Events`,
        staffCount,
        eventCount,
        deptCount,
        participantCount,
        moment,
        participant,
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  eventParticipantsList: async (req, res, next) => {
    try {
      let event;
      if (res.locals.staff && res.locals.staff.role !== "member") {
        event = await Event.findOne({
          name: req.params.name,
        }).populate({
          path: "participants",
          options: {
            sort: {
              updatedAt: -1,
            },
          },
        });
      } else {
        event = await Event.findOne({
          name: req.params.name,
        }).populate({
          path: "participants",
          select: "-email",
          options: {
            sort: {
              updatedAt: -1,
            },
          },
        });
      }
      // console.log(participantsList);
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      // console.log(event);
      return res.render("layouts/dashboard/event-participants", {
        error: req.flash("error"),
        success: req.flash("success"),
        title: `Dashboard | Events | ${event.name} | Participants`,
        staffCount,
        eventCount,
        deptCount,
        participantCount,
        moment,
        event,
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },
};

module.exports = participant;
