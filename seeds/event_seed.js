const mongoose  = require("mongoose"),
      Event     = require("../models/event"),
      events    = require("./event_seed.json");

const DBaddress =
    process.env.DB_URL || "mongodb://localhost:27017/ecell-website";

/*
    run "node ./seeds/event_seed.js"
    to seed the events collection

    make sure to seed participant too, use "node ./seeds/participant_seed.js"
*/

mongoose.connect(DBaddress, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

(async () => {
    await Event.deleteMany({}, (err, deletedEvents) => {
        if (err) {
            console.log(err);
            console.log(
                "An error occured while dropping the events collection"
            );
            return process.exit(0);
        } else {
            console.log(deletedEvents);
            console.log("Events collection has been cleared");
            (async () => {
                await Event.insertMany(events, (err, seededEvents) => {
                    if (err) {
                        console.log(err);
                        console.log(
                            "An error occured while seeding the events collection"
                        );
                        return process.exit(0);
                    } else {
                        console.log("Events collection has been seeded");
                        return process.exit(0);
                    }
                });
            })();
        }
    });
})();