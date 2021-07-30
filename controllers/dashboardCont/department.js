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

const department = {
  departmentRetriver: async (req, res, next) => {
    // for retriving all the departments from the database
    // console.log(res.locals.staff);
    try {
      if (res.locals.staff) {
        await Dept.findOne(
          { _id: res.locals.staff.department },
          async (err, dept) => {
            if (err) {
              console.log(
                `Error occur while retriving departments list from database`
              );
              req.flash(
                "error",
                "An error occured while retriving departments"
              );
              return res.redirect("/dashboard");
            } else if (!dept) {
              req.flash("error", "Department with this name, does not exist");
              return res.redirect("/dashboard");
            } else {
              const staffCount = await Staff.countDocuments();
              const eventCount = await Event.countDocuments();
              const deptCount = await Dept.countDocuments();
              const participantCount = await Participant.countDocuments();
              // console.log(dept);
              return res.render("layouts/dashboard/department", {
                error: req.flash("error"),
                success: req.flash("success"),
                staffCount,
                eventCount,
                deptCount,
                participantCount,
                title: `Dashboard | Departments | ${dept.name}`,
                dept,
              });
            }
          }
        );
      } else {
        req.flash("error", "Something went wrong. Please try again later");
        return res.redirect("/dashboard");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong. Please try again later");
      return res.redirect("/dashboard");
    }
  },

  editDeptInfo: async (req, res, next) => {
    try {
      console.log(req.body);
      await Dept.findOne({ name: req.params.name }, async (err, foundDept) => {
        if (err) {
          req.flash("error", "Something went wrong. Please try again later");
        } else if (!foundDept) {
          req.flash("error", "Department with this name does not exist");
          return res.redirect("back");
        } else {
          // To be changed
          // return res.status(200).json({
          //   foundDept,
          // });
          return res.render(
            "/layouts/dashboard/sections/department-edit-page",
            {
              title: `Dashboard | Departments | ${foundDept.name} | Edit`,
              foundDept,
            }
          );
        }
      });
    } catch (err) {
      next(ErrorHandler.serverError());
    }
  },

  updateDept: async (req, res, next) => {
    try {
      const { name, tagline, description, recruiting } = req.body;

      await Dept.findOne({ _id: req.params.id }, async (err, existingDept) => {
        if (err) {
          console.log(`server error`);
          next(ErrorHandler.serverError());
        } else if (!existingDept) {
          return res.status(404).json({
            message: "Entered Event does not exist",
          });
        } else {
          try {
            await Dept.findOne(
              { name: req.body.name },
              async (err, foundDept) => {
                if (err) {
                  console.log(`server error`);
                  next(ErrorHandler.serverError());
                } else if (foundDept) {
                  return res.status(404).json({
                    message:
                      "Department with the new name already exists, Please try another name",
                  });
                } else {
                  try {
                    existingDept.name = name;
                    existingDept.description = description;
                    existingDept.tagline = tagline;
                    existingDept.recruiting = recruiting;

                    await existingDept.save();
                    return res.status(200).json({
                      message: "Department has been updated successfully",
                    });
                  } catch (err) {
                    console.log("Error while saving the department");
                    res.status(404).json({
                      message: "An Error occured while updating the department",
                    });
                  }
                }
              }
            );
          } catch (err) {
            console.log(err);
            return res.status(404).json({
              message:
                "Something went wrong while saving the event, Please try again later",
            });
          }
        }
      });
    } catch (err) {
      next(ErrorHandler.serverError());
    }
  },

  departmentDeleter: async (req, res, next) => {
    try {
      Dept.findOneAndDelete(
        { name: req.params.name },
        (err, deletedDepartment) => {
          if (err) {
            next(ErrorHandler.serverError());
          } else if (!deletedDepartment) {
            // console.log(deletedDepartment);
            return res.status(404).json({
              message: "Entered department does not exist",
            });
          } else {
            // console.log(deletedDepartment);
            return res.json({
              message: "Department deleted successfully",
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },
};

module.exports = department;
