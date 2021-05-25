const Contact = require("../models/contact");
const Staff = require("../models/staff");

module.exports.index = (req, res) => {
    res.render("layouts/home");
};

module.exports.contact = async (req, res) => {
    const { name, email, message } = req.body.contact;
    console.log(name, email, message);
    const contactData = new Contact(req.body.contact);
    await contactData.save();
    const confirmation_message = "All good";
    res.render("layouts/contact-confirmation", {
        message: confirmation_message,
        error: false,
    });
};

module.exports.staffLogin = (req, res) => {
    res.render("layouts/admin-login");
}

module.exports.createStaff = async (req, res) => {
    const loginData = new Staff(req.body);
    await loginData.save();
    return res.send("Ok created!");
}

module.exports.checkStaff = async (req, res) => {
    const {username, password} = req.body;
    Staff.find({username}, (err, user) => {
        if(err) {
            return res.json({
                message: "User do not exist",
            })
        } 
        if(user[0].password.toString() === password) {
            return res.json({
                message: "Successfully LogedIn!"
            })
        }
        return res.json({
            message: "Invalid username or password"
        })
    })
    return res.send("User found!");
}
