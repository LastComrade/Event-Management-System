const Event = require("../models/event");
const Participant = require("../models/participant");
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
                    foundEvent,
                });
            }
        });
    },

    registerParticipant: async (req, res, next) => {
        await Event.findOne(
            { name: req.params.name },
            async (err, foundEvent) => {
                if (err) {
                    console.log(err);
                    next(Errorhandler.serverError());
                } else if (!foundEvent) {
                    next(
                        Errorhandler.notFoundError(
                            "Event you are trying to register in does not exist"
                        )
                    );
                } else {
                    await Participant.findOne(
                        { email: req.body.participant.email },
                        async (err, foundParticipant) => {
                            if (err) {
                                console.log(err);
                                next(Errorhandler.serverError());
                            } else if (!foundParticipant) {
                                try {
                                    let {
                                        firstname,
                                        lastname,
                                        email,
                                        college_name,
                                        crn,
                                    } = req.body.participant;
                                    registered_events = [
                                        {
                                            _id: foundEvent._id,
                                        },
                                    ];
                                    let participant = new Participant({
                                        firstname,
                                        lastname,
                                        email,
                                        college_name,
                                        crn,
                                        registered_events,
                                    });

                                    let savedParticipant =
                                        await participant.save();
                                    foundEvent.participants.push(
                                        savedParticipant._id
                                    );
                                    await foundEvent.save();
                                    return res.status(200).json({
                                        message:
                                            "Participant registered successfully",
                                    });
                                } catch (err) {
                                    console.log(err);
                                    next(Errorhandler.serverError());
                                }
                            } else {
                                if (
                                    foundParticipant.registered_events.some(
                                        (registered_event_id) => {
                                            return registered_event_id.equals(
                                                foundEvent._id
                                            );
                                        }
                                    )
                                ) {
                                    return res.status(200).json({
                                        message:
                                            "A Participant has already registered in the event with this Email",
                                    });
                                } else {
                                    try {
                                        foundParticipant.registered_events.push(
                                            foundEvent._id
                                        );
                                        let savedParticipant =
                                            await foundParticipant.save();
                                        foundEvent.participants.push(
                                            savedParticipant._id
                                        );
                                        await foundEvent.save();
                                        return res.status(200).json({
                                            message:
                                                "Participant registered successfully",
                                        });
                                    } catch (err) {
                                        console.log(err);
                                        next(Errorhandler.serverError());
                                    }
                                }
                            }
                        }
                    );
                }
            }
        );
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
                        message: "Entered event name already exists",
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
