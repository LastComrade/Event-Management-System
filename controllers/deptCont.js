const Department = require("../models/dept"),
    Errorhandler = require("../utils/errorHandler");
const deptCont = {
    deptCreate: (req, res) => {
        // res.render("layouts/dept-register");
        return res.redirect("/");
    },

    createDept: async (req, res, next) => {
        // console.log(req.body);
        try {
            await Department.findOne(
                { dept_name: req.body.department.name },
                (err, existingDept) => {
                    // console.log(existingDept);
                    if (err) {
                        next(Errorhandler.serverError());
                    } else if (existingDept) {
                        // console.log("else if ran")
                        return res.status(200).json({
                            message: "Entered department already exists",
                        });
                    } else {
                        let newDept = new Department({
                            dept_name: req.body.department.name,
                            dept_head: req.body.department.head,
                            tagline: req.body.department.tagline,
                            description: req.body.department.description,
                            recruiting: req.body.department.recruiting,
                        });
                        newDept.save();
                        // console.log(new_dept);
                        return res.json({
                            message: "Successfully Created the department",
                        });
                    }
                }
            );
        } catch (err) {
            console.log(err);
            next(Errorhandler.serverError());
        }
    },
};

module.exports = deptCont;
