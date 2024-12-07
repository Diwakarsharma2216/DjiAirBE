
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model.js")
const { sendEmail } = require("../routes/send.email.routes.js")
require("dotenv").config();

const userRouter = express.Router();
userRouter.use(express.json());

// User registration route
userRouter.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const existUser = await UserModel.findOne({ email: email });
    // Checking for user if user already exist...
    if (existUser) {
        res.status(400).json({ msg: "User Already Exist....in data base" })
    } else {
        // trying to implement further functionality
        try {
            // Hash the password
            const hash = await bcrypt.hash(password, 5);

            // Create a new user with the hashed password
            const new_user = new UserModel({ email: email, password: hash });
            // sending email to the user before user's registration.......
            const emailResponse = await sendEmail({ body: { to: email, subject: "Welcome to DJI Official cloned by - Diwakar Sharma!" } });
            // Check if email was sent successfully
            if (emailResponse.success) {
                // Saving the user to the database...
                await new_user.save();
                res.status(200).json({ msg: "New user added", new_user: req.body });
            } else {
                res.status(500).json({ msg: "Failed to send email, user not added", error: emailResponse.error });
            }

        } catch (error) {
            res.status(500).json({ msg: "Failed to add new user", error: error.message });
        }
    }


});

// User login route
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Comparing the password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Creating a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            msg: "Login successful",
            token: token,
            user: {
                cart: user.cart,
                userId: user._id,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Login failed", error: error.message });
    }
});

userRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const loggedInUser = await UserModel.findById(id);
        if (!loggedInUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ "USER": loggedInUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})

userRouter.post("/shophistory", async (req, res) => {
    const { id, payload } = req.body;
    try {
        // Find the user by ID and update their shop_history...
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Adding the new shop history entry...
        user.shop_history.push(payload);

        // Save the updated user document...
        await user.save();

        res.status(200).json({ message: 'Shop history updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
})


module.exports = {
    userRouter
};
