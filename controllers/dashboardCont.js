// Same documentation and concepts as homeCont.js refer them if you want to understant the concepts

const Staff = require("../models/staff");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const Event = require("../models/event");
const Dept = require("../models/dept");
const Participant = require("../models/participant");
const registerKey = require("../models/regKey");
const Magazines = require("../models/magazine-reciever");
const Contact = require("../models/contact");
const uuid = require("uuid");
const Internship = require("../models/internship");
const magazineReciever = require("../models/magazine-reciever");
const moment = require("moment");

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
          return res.render("layouts/dashboard/dashboard", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount, eventCount, deptCount, participantCount, title: "Dashboard | Home"
          });
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
          return res.render("layouts/dashboard/board", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffData: staff, staffCount, eventCount, deptCount, participantCount, title: "Dashboard | Board"
          });
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
          const contactMessages = await Contact.find().limit(10);
          const internshipMessages = await Internship.find().limit(10);
          const magazineSubs = await magazineReciever.find({ subscribed: true }).limit(10);
          return res.render("layouts/dashboard/messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount, eventCount, deptCount, participantCount, title: "Dashboard | Messages",
            contactMessages,
            internshipMessages,
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
          const magazineSubs = await magazineReciever.find({ subscribed: true });
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount, eventCount, deptCount, participantCount, title: "Dashboard | Magazine Subscribers",
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
          const contactMessage = await Contact.findOne({ _id: req.params.id });
          console.log(contactMessage)
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount, eventCount, deptCount, participantCount, title: `Dashboard | Contact Messages | ${contactMessage.name}`,
            contactMessage,
            moment
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  contactMessages: async (req, res, next) => {
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
          const contactMessages = await Contact.find();
          // console.log(contactMessages)
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount, eventCount, deptCount, participantCount, title: `Dashboard | Contact Messages`,
            contactMessages,
            moment
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
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
          const internshipMessage = await Internship.findOne({ _id: req.params.id });
          console.log(internshipMessage)
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount, eventCount, deptCount, participantCount, title: `Dashboard | Internship Applications | ${internshipMessage.name}`,
            internshipMessage,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  internshipMessages: async (req, res, next) => {
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
          const internshipMessages = await Internship.find();
          console.log(internshipMessages)
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount, eventCount, deptCount, participantCount, title: `Dashboard | Internship Applications`,
            internshipMessages,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  eventsIndex: async (req, res, next) => {
    // for retriving all the events list from database
    // await Event.find({}, async (err, eventsList) => {
    //   if (err) {
    //     console.log(
    //       `Error occur while retriving events list from database`
    //     );
    //     req.flash("error", "An error occured while retriving events list");
    //     res.redirect("/staff-dashboard");
    //   } else {
    //     return res.json({
    //       eventsList,
    //     });
    //   }
    // });
    try {
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      const events = await Event.find().limit(15);
      console.log(events);

      return res.render("layouts/dashboard/events", {
        error: req.flash("error"),
        success: req.flash("success"),
        title: "Dashboard | Events",
        events, staffCount, eventCount, deptCount, participantCount,
        moment,
      })
    } catch (err) {
      console.log(err)
      next(ErrorHandler.serverError());
    }
  },

  magazineRecieversRetriver: async (req, res, next) => {
    // for retriving all magazine subs from database
    await Magazines.find({}, async (err, magazineSubsList) => {
      if (err) {
        console.log(
          `Error occur while retriving magazine subs list from database`
        );
        req.flash("error", "An error occured while retriving Magazine Recievers list");
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
    await Dept.find({}, async (err, departmentsList) => {
      if (err) {
        console.log(
          `Error occur while retriving departments list from database`
        );
        req.flash("error", "An error occured while retriving departments");
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
    await Participant.find({}, async (err, participantsList) => {
      if (err) {
        console.log(
          `Error occur while retriving participants list from database`
        );
        req.flash("error", "An error occured while retriving participants");
        res.redirect("/staff-dashboard");
      } else {
        return res.json({
          participantsList,
        });
      }
    });
  },

  registerKeyGenerator: (req, res, next) => {
    try {
      const newRegisterKey = new registerKey({
        key: uuid.v4()
      });
      // console.log(newRegisterKey);
      newRegisterKey.save();
      req.flash(
        "success",
        "Registration key generated successfully"
      );
    } catch (err) {
      req.flash(
        "error",
        "Something went wrong! Please try later"
      );
    }
    return res.redirect("/dashboard");
  }
}

module.exports = dboardCont;