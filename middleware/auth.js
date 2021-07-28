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
    try{
      const token = req.cookies.jwt_token;
      if (token) {
        jwt.verify(
          token,
          process.env.JWT_SECRET,
          async (err, decodedToken) => {
            if (err) {
              res.locals.staff = null;
              next();
            } else {
              const staff = await Staff.findOne(
                {
                  _id: decodedToken.id,
                },
                (err, staff) => {
                  if (err) {
                    console.log(err);
                    next(ErrorHandler.serverError());
                  } else if (staff) {
                    const { id, fullname, designation, role, profile_pic_url } = staff;
                    const staffData = { id, fullname, designation, role, profile_pic_url };
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
          }
        );
      }
    }catch(err){
      req.flash("error", "An error occured, Please try again later");
      return res.redirect("/staff-login");
    }
  },

  adminLevelAuth: (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      if (token) {
        jwt.verify(
          token,
          process.env.JWT_SECRET,
          async (err, decodedToken) => {
            if (err) {
              res.locals.staff = null;
              req.flash("error", "An error occured");
              res.redirect("/staff-login");
            } else {
              await Staff.findOne({
                _id: decodedToken.id
              }, (err, foundStaff) => {
                if (err) {
                  console.log(err);
                  req.flash("error", "An error occured, Please try again later");
                  return res.redirect("/staff-login");
                } else if (!foundStaff) {
                  res.cookie("jwt_token", "", { maxAge: 1 });
                  req.flash("error", "Invalid token");
                  return res.redirect("/staff-login");
                } else {
                  // res.locals.staff_role = foundStaff.role;
                  console.log(foundStaff);
                  const role = foundStaff.role;
                  if (foundStaff.role == "admin") {
                    next();
                  } else {
                    req.flash("error", "You are Not Authorized to access this functionality");
                    return res.redirect("/dashboard");
                  }
                }
              })
            }
          })
      } else {
        req.flash("error", "Please login to authenticate yourself");
        return res.redirect("/staff-login")
      }
    } catch (err) {
      req.flash("error", "An error occured, Please try again later");
      return res.redirect("/dashboard")
    }
  },

  presidentLevelAuth: (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      if (token) {
        jwt.verify(
          token,
          process.env.JWT_SECRET,
          async (err, decodedToken) => {
            if (err) {
              res.locals.staff = null;
              req.flash("error", "An error occured");
              res.redirect("/staff-login");
            } else {
              await Staff.findOne({
                _id: decodedToken.id
              }, (err, foundStaff) => {
                if (err) {
                  console.log(err);
                  req.flash("error", "An error occured, Please try again later");
                  return res.redirect("/staff-login");
                } else if (!foundStaff) {
                  res.cookie("jwt_token", "", { maxAge: 1 });
                  req.flash("error", "Invalid token");
                  return res.redirect("/staff-login");
                } else {
                  // console.log(foundStaff);
                  const role = foundStaff.role;
                  if (role == "admin" || role == "president") {
                    next();
                  } else {
                    req.flash("error", "You are Not Authorized to access this functionality");
                    return res.redirect("/dashboard");
                  }
                }
              })
            }
          })
      } else {
        req.flash("error", "Please login to authenticate yourself");
        return res.redirect("/staff-login")
      }
    } catch (err) {
      req.flash("error", "An error occured, Please try again later");
      return res.redirect("/dashboard")
    }
  },

  teamLeaderLevelAuth: (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      if (token) {
        jwt.verify(
          token,
          process.env.JWT_SECRET,
          async (err, decodedToken) => {
            if (err) {
              res.locals.staff = null;
              req.flash("error", "An error occured");
              res.redirect("/staff-login");
            } else {
              await Staff.findOne({
                _id: decodedToken.id
              }, (err, foundStaff) => {
                if (err) {
                  console.log(err);
                  req.flash("error", "An error occured, Please try again later");
                  return res.redirect("/staff-login");
                } else if (!foundStaff) {
                  res.cookie("jwt_token", "", { maxAge: 1 });
                  req.flash("error", "Invalid token");
                  return res.redirect("/staff-login");
                } else {
                  // res.locals.staff_role = foundStaff.role;
                  // console.log(foundStaff);
                  const role = foundStaff.role;
                  if (role == "admin" || role == "president" || role == "tl") {
                    next();
                  } else {
                    req.flash("error", "You are Not Authorized to access this functionality");
                    return res.redirect("dashboard");
                  }
                }
              })
            }
          })
      } else {
        req.flash("error", "Please login to authenticate yourself");
        return res.redirect("/staff-login")
      }
    } catch (err) {
      req.flash("error", "An error occured, Please try again later");
      return res.redirect("/dashboard")
    }
  },

  memberLevelAuth: (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      if (token) {
        jwt.verify(
          token,
          process.env.JWT_SECRET,
          async (err, decodedToken) => {
            if (err) {
              res.locals.staff = null;
              req.flash("error", "An error occured");
              res.redirect("/staff-login");
            } else {
              await Staff.findOne({
                _id: decodedToken.id
              }, (err, foundStaff) => {
                if (err) {
                  console.log(err);
                  req.flash("error", "An error occured, Please try again later");
                  return res.redirect("/staff-login");
                } else if (!foundStaff) {
                  res.cookie("jwt_token", "", { maxAge: 1 });
                  req.flash("error", "Invalid token");
                  return res.redirect("/staff-login");
                } else {
                  // res.locals.staff_role = foundStaff.role;
                  // console.log(foundStaff);
                  const role = foundStaff.role;
                  if (role == "admin" || role == "president" || role == "tl" || role == "member") {
                    next();
                  } else {
                    req.flash("error", "You are Not Authorized to access this functionality");
                    return res.redirect("dashboard");
                  }
                }
              })
            }
          })
      } else {
        req.flash("error", "Please login to authenticate yourself");
        return res.redirect("/staff-login")
      }
    } catch (err) {
      req.flash("error", "An error occured, Please try again later");
      return res.redirect("/dashboard")
    }
  },
};

module.exports = authMid;
