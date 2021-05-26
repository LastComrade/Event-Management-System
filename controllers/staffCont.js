// Same documentation and concepts as homeCont.js refer them if you want to understant the concepts

const Staff = require("../models/staff");
const ErrorHandler = require("../utils/errorHandler");

const staffCont = {

    // Controller to render the staff login page
    staffLogin: (req, res) => {
        res.render("layouts/admin-login");
    },

    // Controller to create staff members in the data base
    createStaff: async (req, res) => {
        const loginData = new Staff(req.body);
        await loginData.save();
        return res.send("Ok created!");
    },

    // Controller used to check the username and password of the staff member trying to login from the admin-login page
    checkStaff: async (req, res) => {
        try {
            console.log("This is check staff");
            console.log(req.body);
            const { username, password } = req.body;
            console.log(username, password);
            const user = await Staff.find(
                { username, password },
                (err, user) => {
                    if (!user.length) {
                        return res.json({
                            message: "User do not exist",
                        });
                    } else if (user.length) {
                        return res.json({
                            message: "Successfully LogedIn!",
                        });
                    }
                    next(ErrorHandler.serverError());
                }
            );
            console.log(user);
        } catch (err) {
            next(ErrorHandler.serverError());
        }
    },
};

module.exports = staffCont;
