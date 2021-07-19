// Same documentation and concepts as homeCont.js refer them if you want to understant the concepts

const Staff = require("../models/staff");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const Event = require("../models/event");
const Dept = require("../models/dept");
const Participant = require("../models/participant");

// for using mongoose methods
const Magazines = require("../models/magazine-reciever");
const Events = require("../models/event");
const Departments = require("../models/dept");
const Participants = require("../models/participant");


const dboardCont = {
  staffDashboard: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const staffCount = await Staff.countDocuments();
          return res.render("layouts/dashboard/dashboard", { staffCount, eventCount, deptCount, participantCount, title: "Dashboard | Home" });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  boardIndex: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const staff = await Staff.find().select("-password -_id -resetPasswordLink -registerPasswordToken -key -password -createdAt -updatedAt");
          // console.log("This should be the array of the staff", staff);
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const staffCount = staff.length;
          return res.render("layouts/dashboard/board", { staffData: staff, staffCount, eventCount, deptCount, participantCount, title: "Dashboard | Board" });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  messageIndex: async (req, res, next) => {
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
          return res.render("layouts/dashboard/message", { staffCount, eventCount, deptCount, participantCount, title: "Dashboard | Messages" });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  eventsRetriver: async (req, res, next) => {
    // for retriving all the events list from database
    await Events.find({}, async (err, eventsList) => {
      if (err) {
        console.log(
          `Error occur while retriving events list from database`
        );
        // req.flash("error","An error occured while retriving events list");
        res.redirect("/staff-dashboard");
      } else {
        return res.json({
          eventsList,
        });
      }
    });
  },

  magazineRecieversRetriver: async (req, res, next) => {
    // for retriving all magazine subs from database
    await Magazines.find({}, async (err, magazineSubsList) => {
      if (err) {
        console.log(
          `Error occur while retriving magazine subs list from database`
        );
        // req.flash("error","An error occured while retriving Magazine Recievers list");
        res.redirect("/staff-dashboard");
      } else {
        return res.json({
          magazineSubsList,
        });
      }
    });
  },

  departmentsRetriver: async (req, res, next) => {
    // for retriving all the departments from the database
    await Departments.find({}, async (err, departmentsList) => {
      if (err) {
        console.log(
          `Error occur while retriving departments list from database`
        );
        // req.flash("error","An error occured while retriving departments");
        res.redirect("/staff-dashboard");
      } else {
        return res.json({
          departmentsList,
        });
      }
    });
  },

  participantsRetriver: async (req, res, next) => {
    // for retriving all the participants from the database
    await Participants.find({}, async (err, participantsList) => {
      if (err) {
        console.log(
          `Error occur while retriving participants list from database`
        );
        // req.flash("error","An error occured while retriving participants");
        res.redirect("/staff-dashboard");
      } else {
        return res.json({
          participantsList,
        });
      }
    });
  },
}

module.exports = dboardCont;