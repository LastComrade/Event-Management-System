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

// Board
const board = require("./board");
// Contact
const contact = require("./contact");
// Internship
const internship = require("./internship");
// Magazine
const magazine = require("./magazine");
// Events
const event = require("./event");
// Departments
const department = require("./department");
// Participants
const participant = require("./participant");
// Key Generation
const keyGenerate = require("./keyGenerate");
// Profile
const profile = require("./profile");

const dboardCont = {
  // Dashboard Index
  staffDashboard: async (req, res, next) => {
    try {
      if (res.locals.staff && res.locals.staff.role === "admin") {
        const eventCount = await Event.countDocuments();
        const deptCount = await Dept.countDocuments();
        const participantCount = await Participant.countDocuments();
        const staffCount = await Staff.countDocuments();
        return res.render("layouts/dashboard/dashboard", {
          error: req.flash("error"),
          success: req.flash("success"),
          staffCount,
          eventCount,
          deptCount,
          participantCount,
          title: "Dashboard | Home",
        });
      } else {
        return res.redirect("/dashboard/board");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong. Please try again later");
      return res.redirect("/dashboard");
      // next(ErrorHandler.serverError());
    }
  },
  ...board,
  ...contact,
  ...internship,
  ...magazine,
  ...event,
  ...department,
  ...participant,
  ...keyGenerate,
  ...profile,
};

module.exports = dboardCont;
