// If we are not in production then use .env file
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const ErrorHandler = require("./utils/errorHandler");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const port = process.env.PORT || 3000;

// Cors policy option for safety of routes in production
const corsOptions = {
    origin: "*",
    method: ["GET", "POST"],
};

// Getting DB Url from the .env file of the local DB
const DB_URL = process.env.DB_URL;

// Creating a mongoose connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// To open the connection to our website
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected!");
});

// express() return a factory function, which is then assigned to the app variable
const app = express();

// Setting ejs as a template engine for our website
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(cors(corsOptions)); // Cors
app.use(express.json()); // To process the requests and parse them into json
app.use(express.urlencoded({ extended: true })); // If you want to operate data requests through classic way
app.use(express.static(path.join(__dirname, "public"))); // Setting up the public folder
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 10 * 60 },
    })
);
app.use(flash());

// Routes Middleware
app.use("/", routes); // For all routes

// Error handling middleware to handle all the errors from the controllers or middlewares
app.use((err, req, res, next) => {
    if (typeof(err) === "string") {
        res.json({
            message: err,
        });
    } else {
        return ErrorHandler.serverError();
    }
});

// For 404 Page Not Found route!
app.get("*", (req, res) => {
    res.render("layouts/error-404");
});

// Creating server with a port number of 3000 locally
app.listen(port, () => console.log(`Server is running on port ${port}`));
