const Department = require("../models/dept");
const Internship = require("../models/internship");
const ErrorHandler = require("../utils/errorHandler");

const deptCont = {

  index: async (req, res, next) => {
    return res.render("layouts/home/department_page")
  },

  allIndex: async (req, res, next) => {
    const deptData = await Department.find().select("name description");
    console.log(deptData);
    return res.render("layouts/home/departments_page", {
      title: "E-Cell | Departments",
      deptData,
    })
  },

  finder: async (req, res, next) => {
    await Department.findOne(
      { name: req.params.name },
      (err, foundDept) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.serverError());
        } else if (!foundDept) {
          next(ErrorHandler.notFoundError());
        } else {
          return res.render("layouts/home/department_page", {
            foundDept,
            title: `E-Cell | Departments | ${foundDept.name}`
          });
        }
      }
    );
  },

  createDept: async (req, res, next) => {
    try {
      const { name, tagline, description, recruiting, members } =
        req.body;
      await Department.findOne({ name }, async (err, existingDept) => {
        if (err) {
          next(ErrorHandler.serverError());
        } else if (existingDept) {
          return res.status(200).json({
            message: "Entered department already exists",
          });
        } else {
          let newDept = new Department({
            name,
            tagline,
            description,
            recruiting,
            members,
          });
          await newDept.save();
          return res.status(200).json({
            message: "Successfully Created the department",
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  internshipRegister: async (req, res, next) => {
    try {
      // console.log(req.body);
      const internshipForm = new Internship(req.body);
      await internshipForm.save();
      // return res.send("Done!");
      return res.status(200).json({
        message: "Internship form submitted successfully"
      })
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  }
};

module.exports = deptCont;
