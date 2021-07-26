const mongoose     = require("mongoose"),
      Staff  = require("../models/staff"),
      staff_seed = require("./staff_seed.json");

const DBaddress =
    process.env.DB_URL || "mongodb://localhost:27017/ecell-website";

/*
    run "node ./seeds/participant_seed.js"
    to seed the participants collection

    make sure to seed departments too, use "node ./seeds/department_seed.js"
*/

mongoose.connect(DBaddress, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

(async () => {
    await Staff.deleteMany({}, (err, deletedStaff) => {
        if (err) {
            console.log(err);
            console.log(
                "An error occured while dropping the staffs collection"
            );
            return process.exit(0);
        } else {
            console.log(deletedStaff);
            console.log("Staffs collection has been cleared");
            (async () => {
                await Staff.insertMany(staff_seed, (err, seededStaff) => {
                    if (err) {
                        console.log(err);
                        console.log(
                            "An error occured while seeding the staffs collection"
                        );
                        return process.exit(0);
                    } else {
                        console.log("Staffs collection has been seeded");
                        return process.exit(0);
                    }
                });
            })();
        }
    });
})();