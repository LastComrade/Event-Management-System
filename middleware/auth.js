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
                    console.log("This is the decoded token", decoded);
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
                                    console.log("This is the staff", staff);
                                    res.locals.staff = staff;
                                    console.log(res.locals);
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
    },
};

module.exports = authMid;
