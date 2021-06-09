const Event = require("../models/event");
const Errorhandler = require("../utils/errorHandler");

const eventCont = {
    index: (req, res) => {
        return res.render("layouts/event-page");
    },

    createEvent: async (req, res, next) => {
        try {
            const {
                name,
                description,
                category,
                registration_starts,
                registration_ends,
                event_starts,
                event_ends,
                organizers
            } = req.body.event;
            await Event.findOne({ name }, async (err, existingEvent) => {
                if (err) {
                    next(Errorhandler.serverError());
                } else if (existingEvent) {
                    return res.status(200).json({
                        message: "Entered event already exists",
                    });
                } else {
                    const newEvent = new Event({
                        name,
                        description,
                        category,
                        registration_starts,
                        registration_ends,
                        event_starts,
                        event_ends,
                        organizers,
                    });
                    await newEvent.save();
                    return res.status(200).json({
                        message: "Successfully Created the event",
                    });
                }
            });
        } catch (err) {
            console.log(err);
            next(Errorhandler.serverError());
        }
    },
};

module.exports = eventCont;
