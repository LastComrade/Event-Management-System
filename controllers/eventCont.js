const Event = require("../models/event");
const Participant = require("../models/participant");
const Errorhandler = require("../utils/errorHandler");
const { google } = require("googleapis");
const moment = require("moment");
const eventSuggestion = require("../models/event-suggestion");

const eventCont = {

  // Render the event page with all types
  eventIndex: async (req, res) => {
    const title = "E-Cell | Events";
    const live = await Event.find({ category: "live" }).select("name event_starts").limit(4);
    const upcoming = await Event.find({ category: "upcoming" }).select("name event_starts").limit(4);
    const archived = await Event.find({ category: "archived" }).select("name event_starts description").limit(4);
    const ongoing = await Event.find({ category: "ongoing" }).select("name event_starts").limit(4);
    const featured = await Event.find({ featured: true }).select("name event_starts").limit(4);
    // console.log(archived);
    return res.render("layouts/home/event-page", { live, upcoming, archived, ongoing, moment, title, featured });
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
          title: `E-Cell | Events | ${req.params.name}`,
          moment,
        });
      }
    });
  },

  registerParticipant: async (req, res, next) => {
    try {
      // console.log(req.body);
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
            try {
              await Participant.findOne(
                { email: req.body.email },
                async (err, foundParticipant) => {
                  if (err) {
                    console.log(err);
                    next(Errorhandler.serverError());
                  } else if (!foundParticipant) {
                    try {
                      let {
                        name,
                        email,
                        college_name,
                        linkedin_account,
                      } = req.body;
                      registered_events = [
                        {
                          _id: foundEvent._id,
                        },
                      ];
                      let participant = new Participant({
                        name,
                        email,
                        college_name,
                        linkedin_account,
                        registered_events,
                      });

                      let savedParticipant = await participant.save();
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
                                  `${name}`,
                                  email,
                                  college_name,
                                  linkedin_account,
                                ],
                              ],
                            },
                          };
                          await sheetAPI.spreadsheets.values.append(
                            options1
                          );
                        } catch (err) {
                          // console.log(err);
                          console.log(
                            `An Error occured while saving the participant in the spreadsheet`
                          );
                        }
                      };

                      return res.status(200).json({
                        message:
                          "Participant registered successfully",
                      });
                    } catch (err) {
                      // console.log(err);
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
                                    `${foundParticipant.name}`,
                                    foundParticipant.email,
                                    foundParticipant.college_name,
                                    foundParticipant.linkedin_account,
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
            } catch (err) {
              next(Errorhandler.serverError())
            }
          }
        }
      );
    } catch (err) {
      next(Errorhandler.serverError())
    }
  },

  createEvent: async (req, res, next) => {
    try {
      const {
        name,
        description,
        category,
        featured,
        registration_starts,
        registration_ends,
        event_starts,
        event_ends,
        result_declaration,
        organizers,
        participants,
      } = req.body;
      await Event.findOne({ name }, async (err, existingEvent) => {
        if (err) {
          next(Errorhandler.serverError());
        } else if (existingEvent) {
          return res.status(200).json({
            message: "Entered event name already exists",
          });
        } else {

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
            console.log("Error occured in Google Sheets");
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
              let temp1 = await sheetAPI.spreadsheets.batchUpdate(eventSheetInfo);
              // await sheetAPI.spreadsheets.batchUpdate(
              //   eventSheetInfo
              // );
              let temp2 = temp1.data.updatedSpreadsheet.sheets[temp1.data.updatedSpreadsheet.sheets.length - 1];
              // console.log(temp2.properties.sheetId)
              let sheetID = temp2.properties.sheetId;
              // console.log(`sheet ID -> ${sheetID}`)
              const newEvent = new Event({
                name,
                description,
                category,
                featured,
                registration_starts,
                registration_ends,
                event_starts,
                event_ends,
                result_declaration,
                organizers,
                participants,
                sheetID
              });

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
                      "LinkedIn Account",
                    ],
                  ],
                },
              };
              await sheetAPI.spreadsheets.values.append(
                eventSheetInfo2
              );
              await newEvent.save();
              return res.status(200).json({
                message: "Successfully Created the event",
              });
            } catch (err) {
              console.log(err)
              console.log(
                "error occured while creating the event on spreadsheet"
              );
            }
          };
          // await newEvent.save();
          // return res.status(200).json({
          //   message: "Successfully Created the event",
          // });
        }
      });
    } catch (err) {
      console.log(err);
      next(Errorhandler.serverError());
    }
  },

  eventSuggest: async (req, res, next) => {
    try {
      const eventSuggest = new eventSuggestion(req.body);
      await eventSuggest.save();
      // return res.redirect("back");
      return res.status(200).json({
        message: "Event Suggestion submitted successfully, Thanks for the submission :)"
      })
    } catch (err) {
      console.log(err);
      next(Errorhandler.serverError());
    }
  }
};

module.exports = eventCont;
