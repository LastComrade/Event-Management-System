const Department = require("../models/dept");
const Errorhandler = require("../utils/errorHandler");

const deptCont = {
    index: (req, res) => {
        return res.redirect("/");
    },

    createDept: async (req, res, next) => {
        try {
            const { name, head, tagline, description, recruiting, members } =
                req.body.department;
            await Department.findOne({ name }, async (err, existingDept) => {
                if (err) {
                    next(Errorhandler.serverError());
                } else if (existingDept) {
                    return res.status(200).json({
                        message: "Entered department already exists",
                    });
                } else {
                    let newDept = new Department({
                        name,
                        head,
                        tagline,
                        description,
                        recruiting,
                        members
                    });
                    await newDept.save();
                    return res.status(200).json({
                        message: "Successfully Created the department",
                    });
                }
            });
        } catch (err) {
            console.log(err);
            next(Errorhandler.serverError());
        }
    },
};

module.exports = deptCont;
