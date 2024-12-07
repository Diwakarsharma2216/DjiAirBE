const express = require("express");
const bcrypt = require("bcrypt")
const { ProductModel, AdminModel } = require("../models/admin.product.model.js")
const adminRouter = express.Router();
const jwt = require("jsonwebtoken")
adminRouter.use(express.json())



// Admin Signup...
adminRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await AdminModel.findOne({ email: email });
    // Checking for user if user already exist...
    if (existUser) {
        res.status(400).json({ msg: "User Already Exist....in data base" })
    } else {
        // trying to implement further functionality
        try {
            // Hash the password
            const hash = await bcrypt.hash(password, 5);
            // Create a new user with the hashed password
            const newAdmin = new AdminModel({ admin_name: name, email: email, password: hash });
            // Saving the admin to the database...
            await newAdmin.save();
            res.status(200).json({ msg: "New user added", admin_data: req.body });
        } catch (error) {
            res.status(500).json({ msg: "Failed to add new user", error: error.message });
        }
    }
});



// Adin login....
adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const admin = await AdminModel.findOne({ email: email });
        if (!admin) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Comparing the password
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Creating a JWT token
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            msg: "Login successful",
            token: token,
            adminId: admin._id
            
        });
    } catch (error) {
        res.status(500).json({ msg: "Login failed", error: error.message });
    }
});


























adminRouter.post("/add/product", async (req, res) => {

    const { cover_img, background_img, discription, background_title, price, category, video_url, images } = req.body;
    try {
        const inserted_product = new ProductModel({
            cover_img, background_img, discription, background_title, price, category, video_url, images
        })
        await inserted_product.save();
        res.status(200).json({ msg: "product added...", inserted_ITEM: inserted_product })
    } catch (error) {
        res.status(401).json({ msg: "failed to add a product in Data Base", error_msg: error.message })
    }

})






module.exports = { adminRouter }