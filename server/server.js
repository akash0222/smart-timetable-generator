const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const cors = require("./config/cors");
const logger = require("./config/logger");
const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(compression());

app.use(cors);

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/v1/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Smart Timetable Generator API"

    });

});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    logger(`Server Started on Port ${PORT}`);

});