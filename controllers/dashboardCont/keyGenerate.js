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

const keyGenerate = {
  registerKeyIndex: async (req, res, next) => {
    try {
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      const keys = await RegKey.find().sort({createdAt: -1});
      return res.render("layouts/dashboard/key-gen", {
        error: req.flash("error"),
        success: req.flash("success"),
        key: req.flash("key"),
        title: "Dashboard | Key Generation",
        staffCount,
        eventCount,
        deptCount,
        participantCount,
        keys,
        moment,
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong! Please try later");
      return res.redirect("/dashboard/generate-key");
    }
  },

  registerKeyGenerator: async (req, res, next) => {
    try {
      const newRegisterKey = new registerKey({
        key: uuid.v4(),
      });
      newRegisterKey.save();
      req.flash("success", "Registration key generated successfully");
      req.flash("key", newRegisterKey.key);
      return res.redirect("/dashboard/generate-key");
      // console.log(newRegisterKey);
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong! Please try later");
      return res.redirect("/dashboard/generate-key");
    }
  },
};

module.exports = keyGenerate;
