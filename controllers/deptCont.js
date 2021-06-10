const Department = require("../models/dept");
const ErrorHandler = require("../utils/errorHandler");

const deptCont = {

    index: (req, res) => {
        res.redirect("/");
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
                    return res.render("layouts/department_page.ejs", {
                        foundDept,
                    });
                }
            }
        );
    },

    createDept: async (req, res, next) => {
        try {
            const { name, head, tagline, description, recruiting, members } =
                req.body.department;
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
};

module.exports = deptCont;
