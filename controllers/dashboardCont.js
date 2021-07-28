// Same documentation and concepts as homeCont.js refer them if you want to understant the concepts

const Staff = require("../models/staff");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const Event = require("../models/event");
const Dept = require("../models/dept");
const Participant = require("../models/participant");
const registerKey = require("../models/regKey");
const Magazines = require("../models/magazine-reciever");
const Contact = require("../models/contact");
const uuid = require("uuid");
const Internship = require("../models/internship");
const magazineReciever = require("../models/magazine-reciever");
const moment = require("moment");
const { google } = require("googleapis");
const RegKey = require("../models/regKey");

const dboardCont = {
  staffDashboard: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const staffCount = await Staff.countDocuments();
          return res.render("layouts/dashboard/dashboard", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: "Dashboard | Home",
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  boardIndex: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const staff = await Staff.find()
            .select(
              "-password -_id -resetPasswordLink -registerPasswordToken -key -password -createdAt -updatedAt"
            )
            .populate("department", "name");
          // console.log("This should be the array of the staff", staff);
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const staffCount = staff.length;
          return res.render("layouts/dashboard/board", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffData: staff,
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: "Dashboard | Board",
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  contactMessageIndex: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const staffCount = await Staff.countDocuments();
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const contactMessages = await Contact.find().limit(10);
          // const internshipMessages = await Internship.find().limit(10);
          // const magazineSubs = await magazineReciever
          //   .find({ subscribed: true })
          //   .limit(10);
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: "Dashboard | Contact Messages",
            contactMessages,
            // internshipMessages,
            // magazineSubs,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  allContactMessages: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const staffCount = await Staff.countDocuments();
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const contactMessages = await Contact.find();
          // console.log(contactMessages)
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: `Dashboard | Contact Messages | All`,
            contactMessages,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  idContactMessage: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const staffCount = await Staff.countDocuments();
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const contactMessage = await Contact.findOne({
            _id: req.params.id,
          });
          // console.log(contactMessage);
          return res.render("layouts/dashboard/messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: `Dashboard | Contact Message | ${contactMessage.name}`,
            contactMessage,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  internshipApplicationIndex: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const staffCount = await Staff.countDocuments();
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const internshipMessages = await Internship.find()
            .sort({ createdAt: -1 })
            .limit(10);
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: "Dashboard | Internship Applications",
            internshipMessages,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  allInternshipMessages: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const staffCount = await Staff.countDocuments();
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const internshipMessages = await Internship.find();
          // console.log(internshipall-messages);
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: `Dashboard | Internship Applications | All`,
            internshipMessages,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  idInternshipMessage: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const staffCount = await Staff.countDocuments();
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const internshipMessage = await Internship.findOne({
            _id: req.params.id,
          });
          // console.log(internshipMessage);
          return res.render("layouts/dashboard/messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: `Dashboard | Internship Applications | ${internshipMessage.name}`,
            internshipMessage,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  magazineSubsIndex: async (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          next(ErrorHandler.forbidden());
        } else if (decodedToken) {
          const staffCount = await Staff.countDocuments();
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          const magazineSubs = await magazineReciever.find({
            subscribed: true,
          });
          return res.render("layouts/dashboard/all-messages", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: "Dashboard | Magazine Subscribers",
            magazineSubs,
            moment,
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

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

  createEvent: async (req, res, next) => {
    try {
      const {
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
              let sheetID = temp2.properties.sheetId;
              // console.log(`sheet ID -> ${sheetID}`)
              const newEvent = new Event({
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
                participants,
                sheetID,
              });

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
              await newEvent.save();
              return res.status(200).json({
                message: "Successfully Created the event",
              });
            } catch (err) {
              console.log(err);
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
              console.log(req.params.id);
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
      const {
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

      Event.findOne({ _id: req.params.id }, async (err, existingEvent) => {
        if (err) {
          console.log(`server error`);
          next(ErrorHandler.serverError());
        } else if (!existingEvent) {
          console.log(existingEvent);
          console.log("thi is ", req.params.id);
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
            }
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
          return res.status(404).json({
            message: "Entered Event does not exist",
          });
        } else {
          // console.log(deletedEvent);
          return res.status(200).json({
            message: "Event deleted successfully",
          });
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
      const events = await Event.find();
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

  magazineRecieversRetriver: async (req, res, next) => {
    // for retriving all magazine subs from database
    await Magazines.find({}, async (err, magazineSubsList) => {
      if (err) {
        console.log(
          `Error occur while retriving magazine subs list from database`
        );
        req.flash(
          "error",
          "An error occured while retriving Magazine Recievers list"
        );
        res.redirect("/staff-dashboard");
      } else {
        return res.json({
          magazineSubsList,
        });
      }
    });
  },

  departmentsRetriver: async (req, res, next) => {
    // for retriving all the departments from the database
    console.log(res.locals.staff.department[0]);
    await Dept.findOne(
      { _id: res.locals.staff.department },
      async (err, dept) => {
        if (err) {
          console.log(
            `Error occur while retriving departments list from database`
          );
          req.flash("error", "An error occured while retriving departments");
          return res.redirect("/dashboard");
        } else if (!dept) {
          req.flash("error", "Department with this name, does not exist");
          return res.redirect("/dashboard");
        } else {
          const staffCount = await Staff.countDocuments();
          const eventCount = await Event.countDocuments();
          const deptCount = await Dept.countDocuments();
          const participantCount = await Participant.countDocuments();
          console.log(dept);
          return res.render("layouts/dashboard/department", {
            error: req.flash("error"),
            success: req.flash("success"),
            staffCount,
            eventCount,
            deptCount,
            participantCount,
            title: `Dashboard | Departments | ${dept.name}`,
            dept,
          });
        }
      }
    );
  },

  editDeptInfo: async (req, res, next) => {
    try {
      console.log(req.body)
      await Dept.findOne({ name: req.params.name }, async (err, foundDept) => {
        if (err) {
          req.flash("error", "Something went wrong. Please try again later");
        } else if (!foundDept) {
          req.flash("error", "Department with this name does not exist");
          return res.redirect("back");
        } else {
          // To be changed
          // return res.status(200).json({
          //   foundDept,
          // });
          return res.render("/layouts/dashboard/sections/department-edit-page", {
            title: `Dashboard | Departments | ${foundDept.name} | Edit`,
            foundDept
          });
        }
      });
    } catch (err) {
      next(ErrorHandler.serverError());
    }
  },

  updateDept: async (req, res, next) => {
    try {
      const { name, tagline, description, recruiting, members } = req.body;

      await Dept.findOne(
        { name: req.params.name },
        async (err, existingDept) => {
          if (err) {
            console.log(`server error`);
            next(ErrorHandler.serverError());
          } else if (!existingDept) {
            return res.status(404).json({
              message: "Entered Event does not exist",
            });
          } else {
            try {
              if (req.body.name == req.params.name) {
                // Written this way to solve an issue
                existingDept.description = description;
                existingDept.tagline = tagline;
                existingDept.recruiting = recruiting;
                existingDept.members = members;
                existingDept.save();
                return res.status(200).json({
                  message: "Department has been updated successfully",
                });
              } else {
                await Dept.findOne(
                  { name: req.body.name },
                  (err, foundDept) => {
                    if (err) {
                      console.log(`server error`);
                      next(ErrorHandler.serverError());
                    } else if (foundDept) {
                      return res.status(404).json({
                        message:
                          "Department with the new name already exists, Please try another name",
                      });
                    } else {
                      try {
                        existingDept.name = name;
                        existingDept.description = description;
                        existingDept.tagline = tagline;
                        existingDept.recruiting = recruiting;
                        existingDept.members = members;

                        existingDept.save();
                        return res.status(200).json({
                          message: "Department has been updated successfully",
                        });
                      } catch (err) {
                        console.log("Error while saving the department");
                        res.status(404).json({
                          message:
                            "An Error occured while updating the department",
                        });
                      }
                    }
                  }
                );
              }
            } catch (err) {
              console.log(err);
              return res.status(404).json({
                message:
                  "Something went wrong while saving the event, Please try again later",
              });
            }
          }
        }
      );
    } catch (err) {
      next(ErrorHandler.serverError());
    }
  },

  departmentDeleter: async (req, res, next) => {
    try {
      Dept.findOneAndDelete(
        { name: req.params.name },
        (err, deletedDepartment) => {
          if (err) {
            next(ErrorHandler.serverError());
          } else if (!deletedDepartment) {
            // console.log(deletedDepartment);
            return res.status(404).json({
              message: "Entered department does not exist",
            });
          } else {
            // console.log(deletedDepartment);
            return res.json({
              message: "Department deleted successfully",
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  participantsRetriver: async (req, res, next) => {
    // for retriving all the participants from the database
    // await Participant.find({}, async (err, participantsList) => {
    //   if (err) {
    //     console.log(
    //       `Error occur while retriving participants list from database`
    //     );
    //     req.flash("error", "An error occured while retriving participants");
    //     res.redirect("/staff-dashboard");
    //   } else {
    //     return res.json({
    //       participantsList,
    //     });
    //   }
    // });
    try {
      const participants = await Participant.find().sort({ updatedAt: -1 });
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      // console.log(participants);
      return res.render("layouts/dashboard/participants", {
        error: req.flash("error"),
        success: req.flash("success"),
        title: "Dashboard | Participants",
        participants,
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

  pidEventRetriver: async (req, res, next) => {
    try {
      const participant = await Participant.findOne({
        _id: req.params.id,
      }).populate("registered_events");
      // console.log(participantsList);
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      // console.log("***********************************")
      // console.log(participant);
      // console.log("***********************************")
      // console.log(req.params.id)
      return res.render("layouts/dashboard/participant-events", {
        error: req.flash("error"),
        success: req.flash("success"),
        title: `Dashboard | Participants | ${participant.name} | Events`,
        staffCount,
        eventCount,
        deptCount,
        participantCount,
        moment,
        participant,
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  eventParticipantsList: async (req, res, next) => {
    try {
      const event = await Event.findOne({
        name: req.params.name,
      }).populate("participants");
      // console.log(participantsList);
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      // console.log(event);
      return res.render("layouts/dashboard/event-participants", {
        error: req.flash("error"),
        success: req.flash("success"),
        title: `Dashboard | Events | ${event.name} | Participants`,
        staffCount,
        eventCount,
        deptCount,
        participantCount,
        moment,
        event,
      });
    } catch (err) {
      console.log(err);
      next(ErrorHandler.serverError());
    }
  },

  registerKeyIndex: async (req, res, next) => {
    try {
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      const keys = await RegKey.find();
      return res.render("layouts/dashboard/key-gen", {
        error: req.flash("error"),
        success: req.flash("success"),
        key: req.flash("key"),
        title: "Dashboard | Key Generation",
        staffCount,
        eventCount,
        deptCount,
        participantCount,
        keys,
        moment,
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong! Please try later");
      return res.redirect("/dashboard/generate-key");
    }
  },

  registerKeyGenerator: async (req, res, next) => {
    try {
      const newRegisterKey = new registerKey({
        key: uuid.v4(),
      });
      newRegisterKey.save();
      req.flash("success", "Registration key generated successfully");
      req.flash("key", newRegisterKey.key);
      return res.redirect("/dashboard/generate-key");
      // console.log(newRegisterKey);
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong! Please try later");
      return res.redirect("/dashboard/generate-key");
    }
  },

  profileIndex: async (req, res, next) => {
    try {
      // console.log(res.locals.staff.id)
      const staffData = await Staff.findOne({
        _id: res.locals.staff.id,
      }).select("firstname lastname sl_li sl_ig sl_fb profile_pic_url");
      // console.log(staff);
      const staffCount = await Staff.countDocuments();
      const eventCount = await Event.countDocuments();
      const deptCount = await Dept.countDocuments();
      const participantCount = await Participant.countDocuments();
      return res.render("layouts/dashboard/profile", {
        error: req.flash("error"),
        success: req.flash("success"),
        key: req.flash("key"),
        title: "Dashboard | Profile",
        staffCount,
        eventCount,
        deptCount,
        participantCount,
        staffData,
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong! Please try later");
      return res.redirect("/dashboard/profile");
    }
  },

  profileEdit: async (req, res, next) => {
    try {
      // console.log("This is t", req.body);
      const { firstname, lastname, profile_pic_url, sl_li, sl_ig, sl_fb } =
        req.body;
      await Staff.findByIdAndUpdate(
        { _id: res.locals.staff.id },
        { firstname, lastname, profile_pic_url, sl_li, sl_ig, sl_fb }
      );
      return res.redirect("/dashboard/profile");
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong! Please try later");
      return res.redirect("/dashboard/profile");
    }
  },
};

module.exports = dboardCont;
