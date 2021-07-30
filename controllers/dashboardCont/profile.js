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

const profile = {
  profileIndex: async (req, res, next) => {
    try {
      // console.log(res.locals.staff.id)
      if (res.locals.staff) {
        const staffData = await Staff.findOne({
          _id: res.locals.staff.id,
        }).select(
          "firstname lastname description sl_li sl_ig sl_fb profile_pic_url"
        );
        // console.log(staff);
        const staffCount = await Staff.countDocuments();
        const eventCount = await Event.countDocuments();
        const deptCount = await Dept.countDocuments();
        const participantCount = await Participant.countDocuments();
        return res.render("layouts/dashboard/profile", {
          error: req.flash("error"),
          success: req.flash("success"),
          key: req.flash("key"),
          title: "Dashboard | Profile",
          staffCount,
          eventCount,
          deptCount,
          participantCount,
          staffData,
        });
      } else {
        req.flash("error", "Something went wrong! Please try later");
        return res.redirect("/staff-login");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong! Please try later");
      return res.redirect("/dashboard/profile");
    }
  },

  profileEdit: async (req, res, next) => {
    try {
      // console.log("This is t", req.body);
      const {
        firstname,
        lastname,
        description,
        profile_pic_url,
        sl_li,
        sl_ig,
        sl_fb,
      } = req.body;
      if (res.locals.staff) {
        await Staff.findByIdAndUpdate(
          { _id: res.locals.staff.id },
          {
            firstname,
            lastname,
            description,
            profile_pic_url,
            sl_li,
            sl_ig,
            sl_fb,
          }
        );
        return res.redirect("/dashboard/profile");
      } else {
        req.flash("error", "Something went wrong! Please try later");
        return res.redirect("/dashboard");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong! Please try later");
      return res.redirect("/dashboard/profile");
    }
  },
};

module.exports = profile;
