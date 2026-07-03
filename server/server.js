const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {

    res.json({
        message: "Smart Timetable Generator API Running",
    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on ${PORT}`);

});