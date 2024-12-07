const express = require("express");
const { ProductModel } = require("../models/admin.product.model.js")
const {UserModel} = require("../models/user.model.js");
const cartRoute = express.Router();
cartRoute.use(express.json())


cartRoute.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const Cart = await ProductModel.findById(id)
        res.status(200).json({ msg: "Here is your cart details", cart: Cart })
        console.log(Cart)
    } catch (error) {
        res.status(405).json({ Error_msg: error.message })
    }
})

cartRoute.put("/updateCart", async (req, res) => {
    const { updatedCart, UID } = req.body;

    try {
        // Finding the user by ID and updating their cart array...
        const user = await UserModel.findByIdAndUpdate(
            UID,
            { $set: { cart: updatedCart } },
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ Error_msg: "User not found" });
        }

        res.status(200).json({ message: "Cart updated successfully", updatedUser: user });
    } catch (error) {
        res.status(405).json({ Error_msg: error.message });
    }
});



cartRoute.get("/get/:UID", async (req, res) => {
  

    try {
        // Finding the user by ID and updating their cart array...
        const {UID} = req.params
        const user = await UserModel.findById(
            UID 
        );

        if (!user) {
            return res.status(404).json({ Error_msg: "User not found" });
        }

        res.status(200).json({ message: "Cart data here" , data: user.cart});
    } catch (error) {
        res.status(405).json({ Error_msg: error.message });
    }
});





module.exports = { cartRoute }