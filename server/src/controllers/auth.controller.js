const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        // Validation
        if ( !name || !email || !password ) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // checking if user exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // send response (no password)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }catch (error) {
        console.error("Register user:", error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = { registerUser };