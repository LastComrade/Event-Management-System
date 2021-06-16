const Event = require("../models/event");
const Errorhandler = require("../utils/errorHandler");

const eventCont = {
    index: (req, res) => {
        return res.render("layouts/event-page");
    },

    finder: async (req, res, next) => {
        await Event.findOne({ name: req.params.name }, (err, foundEvent) => {
            if (err) {
                next(Errorhandler.serverError());
            } else if (!foundEvent) {
                next(Errorhandler.notFoundError());
            } else {
                return res.render("layouts/event-page", {
                    foundEvent
                });
            }
        });
    },

    registerParticipant: async (req, res, next) => {
        await Event.findOne({ name: req.params.name }, async (err, foundEvent) => {
            if(err){
                console.log(err);
                next(Errorhandler.serverError());
            }else if(!foundEvent){
                next(Errorhandler.notFoundError("Event you are trying to register in does not exist"));
            }else{
                let participant = {
                    firstname,
                    lastname,
                    email,
                    collegename,
                    collegeRollNo,
                } = req.body.participant;
                foundEvent.participants.push(participant);
                await foundEvent.save();
                return res.send("Participant Registered");
            }
        })
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
                result_declaration,
                organizers,
                participants,
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
                        result_declaration,
                        organizers,
                        participants,
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
