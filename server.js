if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// test change

const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const cors = require("cors");
const mongoose = require("mongoose");
const homeRoutes = require("./routes/home");
const ErrorHandler = require("./utils/errorHandler");

const corsOptions = {
    origin: "*",
    method: ["GET", "POST"],
};

const DBurl = process.env.DB_URL || "mongodb://localhost:27017/ecell-website";

mongoose.connect(DBurl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("E-Cell Database Connected!");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes Middleware
app.use("/", homeRoutes);

app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status,
            },
        });
    } else {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status,
            },
        });
    }
});

app.get("*", (req, res) => {
    res.render("layouts/error-404");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
