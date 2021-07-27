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
          const staff = await Staff.find().select(
            "-password -_id -resetPasswordLink -registerPasswordToken -key -password -createdAt -updatedAt"
          );
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

  editEventInfo: async (req, res, next) => {
    try {
      await Event.findOne(
        { name: req.params.name },
        async (err, foundEvent) => {
          if (err) {
            next(ErrorHandler.serverError());
          } else if (!foundEvent) {
            return res.status(404).json({
              message: "Entered Event does not found",
            });
          } else {
            // To be changed
            return res.status(200).json({
              foundEvent,
            });
            // return res.render("/layouts/event-edit-page", {
            //     foundEvent
            // });
          }
        }
      );
    } catch (err) {
      next(ErrorHandler.serverError());
    }
  },

  updateEvent: async (req, res, next) => {
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
      } = req.body;

      Event.findOne({ name: req.params.name }, (err, existingEvent) => {
        if (err) {
          console.log(`server error`);
          next(ErrorHandler.serverError());
        } else if (!existingEvent) {
          return res.status(404).json({
            message: "Entered Event does not exist",
          });
        } else {
          try {
            if (req.body.name == req.params.name) {
              // Written this way to solve an issue
              existingEvent.description = description;
              existingEvent.category = category;
              existingEvent.featured = featured;
              existingEvent.registration_starts = registration_starts;
              existingEvent.registration_ends = registration_ends;
              existingEvent.event_starts = event_starts;
              existingEvent.event_ends = event_ends;
              existingEvent.result_declaration = result_declaration;
              existingEvent.organizers = organizers;
              existingEvent.save();
              return res.status(200).json({
                message: "Event has been updated successfully",
              });
            } else {
              Event.findOne({ name: req.body.name }, (err, foundEvent2) => {
                if (err) {
                  console.log(`server error`);
                  next(ErrorHandler.serverError());
                } else if (foundEvent2) {
                  return res.status(404).json({
                    message:
                      "Event with the new name already exists, Please try another name",
                  });
                } else {
                  existingEvent.name = name;
                  existingEvent.description = description;
                  existingEvent.category = category;
                  existingEvent.featured = featured;
                  existingEvent.registration_starts = registration_starts;
                  existingEvent.registration_ends = registration_ends;
                  existingEvent.event_starts = event_starts;
                  existingEvent.event_ends = event_ends;
                  existingEvent.result_declaration = result_declaration;
                  existingEvent.organizers = organizers;

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
                                  title: name,
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
                  };

                  existingEvent.save();
                  return res.status(200).json({
                    message: "Event has been updated successfully",
                  });
                }
              });
            }
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
      const events = await Event.find().limit(15);
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
    await Dept.find({}, async (err, departmentsList) => {
      if (err) {
        console.log(
          `Error occur while retriving departments list from database`
        );
        req.flash("error", "An error occured while retriving departments");
        res.redirect("/staff-dashboard");
      } else {
        return res.json({
          departmentsList,
        });
      }
    });
  },

  editDeptInfo: async (req, res, next) => {
    try {
      await Dept.findOne({ name: req.params.name }, async (err, foundDept) => {
        if (err) {
          next(ErrorHandler.serverError());
        } else if (!foundDept) {
          return res.status(404).json({
            message:
              "Department to be edited does not exist, Please enter a valid department",
          });
        } else {
          // To be changed
          return res.status(200).json({
            foundDept,
          });
          // return res.render("/layouts/deparment-edit-page", {
          //     foundDept
          // });
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
      const staffData = await Staff.findOne({ _id: res.locals.staff.id }).select(
        "firstname lastname sl_li sl_ig sl_fb profile_pic_url"
      );
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
      await Staff.findByIdAndUpdate({ _id: res.locals.staff.id }, req.body);
      return res.redirect("back")
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong! Please try later");
      return res.redirect("back");
    }
  },
};

module.exports = dboardCont;
