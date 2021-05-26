const Staff = require("../models/staff");

const staffCont = {
    staffLogin: (req, res) => {
        res.render("layouts/admin-login");
    },

    createStaff: async (req, res) => {
        const loginData = new Staff(req.body);
        await loginData.save();
        return res.send("Ok created!");
    },

    checkStaff: async (req, res) => {
        const { username, password } = req.body;
        Staff.find({ username }, (err, user) => {
            if (err) {
                return res.json({
                    message: "User do not exist",
                });
            }
            if (user[0].password.toString() === password) {
                return res.json({
                    message: "Successfully LogedIn!",
                });
            }
            return res.json({
                message: "Invalid username or password",
            });
        });
        return res.send("User found!");
    },
};

module.exports = staffCont;