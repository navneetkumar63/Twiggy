import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "Validator"




//login user 

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        
        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        
        const token = generateToken(user._id);

       
        res.status(200).json({
            success: true,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Please enter a strong password (at least 8 characters)"
            });
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        const user = await newUser.save();

        // Generate a token
        const token = generateToken(user._id);

        // Respond with success
        res.status(201).json({
            success: true,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Generate Token Function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};


export {loginUser, registerUser }


