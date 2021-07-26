const mongoose    = require("mongoose"),
      Department  = require("../models/dept"),
      departments = require("./dept_seed.json");

const DBaddress =
    process.env.DB_URL || "mongodb://localhost:27017/ecell-website";

/*
    run "node ./seeds/department_seed.js"
    to seed the departments collection

    make sure to seed staff too, use "node ./seeds/staff_seed.js"
*/

mongoose.connect(DBaddress, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

(async () => {
    await Department.deleteMany({}, (err, deletedDepts) => {
        if (err) {
            console.log(err);
            console.log(
                "An error occured while dropping the departments collection"
            );
            return process.exit(0);
        } else {
            console.log(deletedDepts);
            console.log("Departments collection has been cleared");
            (async () => {
                await Department.insertMany(departments, (err, seededDepts) => {
                    if (err) {
                        console.log(err);
                        console.log(
                            "An error occured while seeding the departments collection"
                        );
                        return process.exit(0);
                    } else {
                        console.log("Departments collection has been seeded");
                        return process.exit(0);
                    }
                });
            })();
        }
    });
})();