const Staff = require("../../models/staff");
const ErrorHandler = require("../../utils/errorHandler");
const jwt = require("jsonwebtoken");
const Event = require("../../models/event");
const Dept = require("../../models/dept");
const Participant = require("../../models/participant");

const board = {
  boardIndex: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          let staff;
          if (res.locals.staff && res.locals.staff.role === "member") {
            staff = await Staff.find()
              .select(
                "-password -_id -resetPasswordLink -registerPasswordToken -key -password -createdAt -updatedAt -email"
              )
              .populate("department", "name");
          } else {
            staff = await Staff.find()
              .select(
                "-password -_id -resetPasswordLink -registerPasswordToken -key -password -createdAt -updatedAt"
              )
              .populate("department", "name");
          }
          // console.log("This should be the array of the staff", staff);
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const staffCount = staff.length;
          return res.render("layouts/dashboard/board", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffData: staff,
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: "Dashboard | Board",
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },
};

module.exports = board;
