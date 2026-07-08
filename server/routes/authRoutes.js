const express = require("express");

const router = express.Router();

const {
    register,
    login,
    me
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const validate = require("../middleware/validate");

const {
    registerValidator,
    loginValidator
} = require("../validators/authValidator");

const {
    loginLimiter
} = require("../middleware/rateLimiter");

router.post(
    "/register",
    registerValidator,
    validate,
    register
);

router.post(
    "/login",
    loginLimiter,
    loginValidator,
    validate,
    login
);

router.get(
    "/me",
    protect,
    me
);

module.exports = router;