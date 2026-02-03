const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
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

// Login User
const loginUser = async (req,res) => {
    try{
        const{ email, password } = req.body;

        //Validation
        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        //Check if the user exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // generate jwt
        const token = jwt.sign(
            { userId: user._id},
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );

        // SEND response
        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = { registerUser, loginUser };