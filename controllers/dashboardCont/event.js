const Staff = require("../../models/staff");
const ErrorHandler = require("../../utils/errorHandler");
const jwt = require("jsonwebtoken");
const Event = require("../../models/event");
const Dept = require("../../models/dept");
const Participant = require("../../models/participant");
const registerKey = require("../../models/regKey");
const Magazines = require("../../models/magazine-reciever");
const Contact = require("../../models/contact");
const uuid = require("uuid");
const Internship = require("../../models/internship");
const magazineReciever = require("../../models/magazine-reciever");
const moment = require("moment");
const { google } = require("googleapis");
const RegKey = require("../../models/regKey");

const event = {
  createEventIndex: async (req, res, next) => {
    try {
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      return res.render("layouts/dashboard/event-create", {
        error: req.flash("error"),
        success: req.flash("success"),
        staffCount,
        eventCount,
        deptCount,
        participantCount,
        title: "Dashboard | Create Event",
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  editEventInfo: async (req, res, next) => {
    try {
      await Event.findOne({ _id: req.params.id }, async (err, event) => {
        if (err) {
          req.flash("error", "Something went wrong. Please try again later");
          return res.redirect("back");
        } else if (!event) {
          req.flash("error", "Event with this name does not exist");
          return res.redirect("back");
        } else {
          // To be changed
          // return res.status(200).json({
          //   foundEvent,
          // });
          const staffCount = await Staff.countDocuments();
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          return res.render("layouts/dashboard/event-edit", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: `Dashboard | Events | ${event.name} | Edit `,
            event,
          });
        }
      });
    } catch (err) {
      next(ErrorHandler.serverError());
    }
  },

  createEvent: async (req, res, next) => {
    try {
      let {
        name,
        description,
        tagline,
        event_pic,
        event_poster,
        category,
        featured,
        registration_starts,
        registration_ends,
        event_starts,
        event_ends,
        result_declaration,
        organizers,
        sponsors,
        hosts,
      } = req.body;
      name = name.trim();
      await Event.findOne({ name }, async (err, existingEvent) => {
        if (err) {
          next(Errorhandler.serverError());
        } else if (existingEvent) {
          return res.status(200).json({
            message: "Entered event name already exists",
          });
        } else {
          let sheetID = "";
          const newEvent = new Event({
            name,
            description,
            tagline,
            category,
            event_pic,
            event_poster,
            featured,
            registration_starts,
            registration_ends,
            event_starts,
            event_ends,
            result_declaration,
            organizers,
            hosts,
            sponsors,
            sheetID,
          });

          await newEvent.save();
          res.status(200).json({
            message: "Successfully Created the event",
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
              let temp1 = await sheetAPI.spreadsheets.batchUpdate(
                eventSheetInfo
              );
              // await sheetAPI.spreadsheets.batchUpdate(
              //   eventSheetInfo
              // );
              let temp2 =
                temp1.data.updatedSpreadsheet.sheets[
                  temp1.data.updatedSpreadsheet.sheets.length - 1
                ];
              // console.log(temp2.properties.sheetId)
              sheetID = temp2.properties.sheetId;
              // console.log(`sheet ID -> ${sheetID}`)
              // console.log(req.params.id);
              await Event.findOneAndUpdate(
                { name: req.body.name },
                { sheetID }
              );

              const eventSheetInfo2 = {
                spreadsheetId: process.env.event_spreadsheet_id,
                range: `${name}!A1`,
                valueInputOption: "RAW",
                resource: {
                  values: [
                    ["Name", "Email", "College Name", "LinkedIn Account"],
                  ],
                },
              };
              await sheetAPI.spreadsheets.values.append(eventSheetInfo2);

              const eventSheetInfo3 = {
                spreadsheetId: process.env.event_spreadsheet_id,
                resource: {
                  requests: [
                    {
                      updateSheetProperties: {
                        properties: {
                          sheetId: sheetID,
                          title: `${req.body.name}_${sheetID}`,
                        },
                        fields: "title",
                      },
                    },
                  ],
                  includeSpreadsheetInResponse: true,
                },
              };
              await sheetAPI.spreadsheets.batchUpdate(eventSheetInfo3);
            } catch (err) {
              console.log(err);
              console.log(
                "error occured while creating the event on spreadsheet"
              );
            }
          };
          return;
        }
      });
    } catch (err) {
      console.log(err);
      next(Errorhandler.serverError());
    }
  },

  updateEvent: async (req, res, next) => {
    try {
      let {
        name,
        description,
        tagline,
        event_poster,
        event_pic,
        category,
        featured,
        registration_starts,
        registration_ends,
        event_starts,
        event_ends,
        result_declaration,
        organizers,
        hosts,
        sponsors,
      } = req.body;
      // console.log(name.length);
      name = name.trim();
      // console.log(name.length);
      // console.log(name);
      Event.findOne({ _id: req.params.id }, async (err, existingEvent) => {
        if (err) {
          console.log(`server error`);
          next(ErrorHandler.serverError());
        } else if (!existingEvent) {
          console.log("This???", existingEvent);
          // console.log("thi is ", req.params.id);
          return res.status(404).json({
            message: "Entered Event does not exist",
          });
        } else {
          try {
            // if (req.body.id == req.params.id) {
            //   // Written this way to solve an issue
            //   existingEvent.description = description;
            //   existingEvent.category = category;
            //   existingEvent.event_pic = event_pic;
            //   existingEvent.event_poster = event_poster;
            //   existingEvent.featured = featured;
            //   existingEvent.registration_starts = registration_starts;
            //   existingEvent.registration_ends = registration_ends;
            //   existingEvent.event_starts = event_starts;
            //   existingEvent.event_ends = event_ends;
            //   existingEvent.result_declaration = result_declaration;
            //   existingEvent.organizers = organizers;
            //   existingEvent.hosts = hosts;
            //   existingEvent.sponsors = sponsors;
            //   existingEvent.save();
            //   return res.status(200).json({
            //     message: "Event has been updated successfully",
            //   });
            // } else {
            // Event.findOne({ _id: req.params.id }, (err, foundEvent2) => {
            //   if (err) {
            //     console.log(`server error`);
            //     next(ErrorHandler.serverError());
            //   } else if (foundEvent2) {
            //     return res.status(404).json({
            //       message:
            //         "Event with the new name already exists, Please try another name",
            //     });
            //   } else {
            existingEvent.name = name;
            existingEvent.description = description;
            existingEvent.tagline = tagline;
            existingEvent.category = category;
            existingEvent.event_pic = event_pic;
            existingEvent.event_poster = event_poster;
            existingEvent.featured = featured;
            existingEvent.registration_starts = registration_starts;
            existingEvent.registration_ends = registration_ends;
            existingEvent.event_starts = event_starts;
            existingEvent.event_ends = event_ends;
            existingEvent.result_declaration = result_declaration;
            existingEvent.organizers = organizers;
            existingEvent.hosts = hosts;
            existingEvent.sponsors = sponsors;
            await existingEvent.save();
            res.status(200).json({
              message: "Event has been updated successfully",
            });
            // SheetAPI code
            // if(existingEvent.name != name){
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
                  eventSheetEditor(client_side);
                }
              });
            } catch (err) {
              console.log(err);
              console.log("Error occured in Google Sheets");
            }
            eventSheetEditor = async (client) => {
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
                        updateSheetProperties: {
                          properties: {
                            sheetId: existingEvent.sheetID,
                            title: `${name}_${existingEvent.sheetID}`,
                          },
                          fields: "title",
                        },
                      },
                    ],
                    includeSpreadsheetInResponse: true,
                  },
                };
                await sheetAPI.spreadsheets.batchUpdate(eventSheetInfo);
              } catch (err) {
                // console.log(err);
                console.log(
                  "error occured while updating the event on spreadsheet"
                );
              }
              // };
            };
            return;
          } catch (err) {
            // console.log(err);
            return res.status(404).json({
              message:
                "Something went wrong while saving the event, Please try again later",
            });
          }
        }
      });
    } catch (err) {
      next(ErrorHandler.serverError());
    }
  },

  eventDeleter: async (req, res, next) => {
    try {
      Event.findOneAndDelete({ name: req.params.name }, (err, deletedEvent) => {
        if (err) {
          next(ErrorHandler.serverError());
        } else if (!deletedEvent) {
          // console.log(deletedEvent);
          req.flash("error", "Entered Event does not exist");
          return res.redirect("back");
          // return res.status(404).json({
          //   message: "Entered Event does not exist",
          // });
        } else {
          // console.log(deletedEvent);
          console.log(deletedEvent);
          req.flash("success", "Event deleted successfully");
          return res.redirect("back");
          // return res.status(200).json({
          //   message: "Event deleted successfully",
          // });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  eventsIndex: async (req, res, next) => {
    // for retriving all the events list from database
    // await Event.find({}, async (err, eventsList) => {
    //   if (err) {
    //     console.log(
    //       `Error occur while retriving events list from database`
    //     );
    //     req.flash("error", "An error occured while retriving events list");
    //     res.redirect("/staff-dashboard");
    //   } else {
    //     return res.json({
    //       eventsList,
    //     });
    //   }
    // });
    try {
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      const events = await Event.find().sort({ updatedAt: -1 });
      // console.log(events);

      return res.render("layouts/dashboard/events", {
        error: req.flash("error"),
        success: req.flash("success"),
        title: "Dashboard | Events",
        events,
        staffCount,
        eventCount,
        deptCount,
        participantCount,
        moment,
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },
};

module.exports = event;
