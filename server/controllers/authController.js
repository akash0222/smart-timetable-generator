const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const exists = await User.findOne({ email });

        if (exists)
            return res.status(400).json({
                message: "Email already exists",
            });

        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive
};

    return res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
        token: generateToken(user._id, user.role),
        user: userResponse
    }
    });

    } catch (error) {

        res.status(500).json(error);

    }

};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email,
        });

        if (!user)
            return res.status(401).json({
                message: "Invalid Credentials",
            });

        const match = await user.matchPassword(password);

        if (!match)
            return res.status(401).json({
                message: "Invalid Credentials",
            });

        const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
};

        return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
        token: generateToken(user._id, user.role),
        user: userResponse,
            },
        });

    } catch (error) {

        res.status(500).json(error);

    }

};

const me = async (req, res) => {

    res.json(req.user);

};

module.exports = {
    register,
    login,
    me,
};