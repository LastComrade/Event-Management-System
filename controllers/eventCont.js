const Event = require("../models/event");
const Participant = require("../models/participant");
const Errorhandler = require("../utils/errorHandler");
const { google } = require("googleapis");

const eventCont = {

    // Render the event page with all types
    eventIndex: (req, res) => {
        return res.render("layouts/home/event-page");
    },

    finder: async (req, res, next) => {
        await Event.findOne({ name: req.params.name }, (err, foundEvent) => {
            if (err) {
                next(Errorhandler.serverError());
            } else if (!foundEvent) {
                next(Errorhandler.notFoundError());
            } else {
                return res.render("layouts/home/event-landing", {
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
                            "Event you are trying to register, does not exist"
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

                                    // Sheet API code
                                    try {
                                        let client_side = new google.auth.JWT(
                                            process.env.client_email,
                                            null,
                                            process.env.private_key,
                                            [
                                                "https://www.googleapis.com/auth/spreadsheets",
                                            ]
                                        );

                                        client_side.authorize((err, token) => {
                                            if (err) {
                                                console.log(err);
                                                return;
                                            } else {
                                                participantSheetEditor(
                                                    client_side
                                                );
                                            }
                                        });
                                    } catch (err) {
                                        console.log(
                                            `An error Occured in Google auth`
                                        );
                                    }

                                    participantSheetEditor = async (client) => {
                                        try {
                                            const sheetAPI = google.sheets({
                                                version: "v4",
                                                auth: client,
                                            });

                                            const options1 = {
                                                spreadsheetId:
                                                    process.env
                                                        .event_spreadsheet_id,
                                                range: `${foundEvent.name}!A2`,
                                                valueInputOption: "RAW",
                                                resource: {
                                                    values: [
                                                        [
                                                            `${firstname} ${lastname}`,
                                                            email,
                                                            college_name,
                                                            crn,
                                                        ],
                                                    ],
                                                },
                                            };
                                            await sheetAPI.spreadsheets.values.append(
                                                options1
                                            );
                                        } catch (err) {
                                            console.log(
                                                `An Error occured while saving the participant in the spreadsheet`
                                            );
                                            // console.log(err);
                                        }
                                    };

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

                                        // Sheet API code
                                        try {
                                            let client_side =
                                                new google.auth.JWT(
                                                    process.env.client_email,
                                                    null,
                                                    process.env.private_key,
                                                    [
                                                        "https://www.googleapis.com/auth/spreadsheets",
                                                    ]
                                                );

                                            client_side.authorize(
                                                (err, token) => {
                                                    if (err) {
                                                        console.log(err);
                                                        return;
                                                    } else {
                                                        participantSheetEditor(
                                                            client_side
                                                        );
                                                    }
                                                }
                                            );
                                        } catch (err) {
                                            console.log(
                                                `An error Occured in Google auth`
                                            );
                                        }

                                        participantSheetEditor = async (
                                            client
                                        ) => {
                                            try {
                                                const sheetAPI = google.sheets({
                                                    version: "v4",
                                                    auth: client,
                                                });

                                                const info = {
                                                    spreadsheetId:
                                                        process.env
                                                            .event_spreadsheet_id,
                                                    range: `${foundEvent.name}!A2`,
                                                    valueInputOption: "RAW",
                                                    resource: {
                                                        values: [
                                                            [
                                                                `${foundParticipant.firstname} ${foundParticipant.lastname}`,
                                                                foundParticipant.email,
                                                                foundParticipant.college_name,
                                                                foundParticipant.crn,
                                                            ],
                                                        ],
                                                    },
                                                };
                                                await sheetAPI.spreadsheets.values.append(
                                                    info
                                                );
                                            } catch (err) {
                                                console.log(
                                                    `An Error occured while saving the participant in the spreadsheet`
                                                );
                                            }
                                        };

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

                    // SheetAPI code
                    try {
                        let client_side = new google.auth.JWT(
                            process.env.client_email,
                            null,
                            process.env.private_key,
                            ["https://www.googleapis.com/auth/spreadsheets"]
                        );

                        client_side.authorize((err, token) => {
                            if (err) {
                                console.log(err);
                                return;
                            } else {
                                eventSheetAdder(client_side);
                            }
                        });
                    } catch (err) {
                        console.log("Error occured in Google auth");
                    }

                    eventSheetAdder = async (client) => {
                        try {
                            const sheetAPI = google.sheets({
                                version: "v4",
                                auth: client,
                            });

                            const eventSheetInfo = {
                                spreadsheetId: process.env.event_spreadsheet_id,
                                resource: {
                                    requests: [
                                        {
                                            addSheet: {
                                                properties: {
                                                    title: name,
                                                },
                                            },
                                        },
                                    ],
                                    includeSpreadsheetInResponse: true,
                                },
                            };
                            // let temp1 = await sheetAPI.spreadsheets.batchUpdate(eventSheetInfo);
                            await sheetAPI.spreadsheets.batchUpdate(
                                eventSheetInfo
                            );
                            // let temp2 = temp1.data.updatedSpreadsheet.sheets[temp1.data.updatedSpreadsheet.sheets.length - 1];
                            // console.log(temp2)

                            const eventSheetInfo2 = {
                                spreadsheetId: process.env.event_spreadsheet_id,
                                range: `${name}!A1`,
                                valueInputOption: "RAW",
                                resource: {
                                    values: [
                                        [
                                            "Name",
                                            "Email",
                                            "College Name",
                                            "College Roll No.",
                                        ],
                                    ],
                                },
                            };
                            await sheetAPI.spreadsheets.values.append(
                                eventSheetInfo2
                            );
                        } catch (err) {
                            console.log(
                                "error occured while creating the event on spreadsheet"
                            );
                        }
                    };

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
