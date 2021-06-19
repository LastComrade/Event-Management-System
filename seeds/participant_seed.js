const mongoose     = require("mongoose"),
      Participant  = require("../models/participant"),
      participants = require("./participant_seed.json");

const DBaddress =
    process.env.DB_URL || "mongodb://localhost:27017/ecell-website";

/*
    run "node ./seeds/participant_seed.js"
    to seed the participants collection

    make sure to seed events too, use "node ./seeds/event_seed.js"
*/

mongoose.connect(DBaddress, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

(async () => {
    await Participant.deleteMany({}, (err, deletedParticipants) => {
        if (err) {
            console.log(err);
            console.log(
                "An error occured while dropping the participants collection"
            );
            return process.exit(0);
        } else {
            console.log(deletedParticipants);
            console.log("Participants collection has been cleared");
            (async () => {
                await Participant.insertMany(participants, (err, seededParticipant) => {
                    if (err) {
                        console.log(err);
                        console.log(
                            "An error occured while seeding the participants collection"
                        );
                        return process.exit(0);
                    } else {
                        console.log("Participants collection has been seeded");
                        return process.exit(0);
                    }
                });
            })();
        }
    });
})();