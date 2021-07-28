const jwt = require("jsonwebtoken");
const Staff = require("../models/staff");
const ErrorHandler = require("../utils/errorHandler");

const authMid = {
  authRequired: (req, res, next) => {
    const token = req.cookies.jwt_token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.redirect("/staff-login");
        } else {
          next();
        }
      });
    } else {
      return res.redirect("/staff-login");
    }
  },

  staffCheck: (req, res, next) => {
    const token = req.cookies.jwt_token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          res.locals.staff = null;
        } else {
          await Staff.findOne(
            {
              _id: decodedToken.id,
            },
            (err, staff) => {
              if (err) {
                console.log(err);
                next(ErrorHandler.serverError());
              } else if (staff) {
                let { id, fullname, designation, profile_pic_url, department, role } =
                  staff;
                department = department[0];
                const staffData = {
                  id,
                  fullname,
                  designation,
                  profile_pic_url,
                  department,
                  role
                };
                res.locals.staff = staffData;
                const token = jwt.sign(
                  {
                    id: staff._id,
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "30m",
                  }
                );
                res.cookie("jwt_token", token, {
                  httpOnly: true,
                  secure: true,
                  maxAge: 30 * 60 * 1000,
                });
              } else {
                res.cookie("jwt_token", "", { maxAge: 1 });
                return res.redirect("/staff-login");
              }
            }
          );
          next();
        }
      });
    } else {
      return res.redirect("/staff-login");
    }
  },
};

module.exports = authMid;
