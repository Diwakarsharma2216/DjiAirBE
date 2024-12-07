const express = require("express");
const { ProductModel } = require("../models/admin.product.model.js")
const productRoute = express.Router();
productRoute.use(express.json())




productRoute.get("/get", async (req, res) => {
    const { sort } = req.query;
    sortOrder = {};
    if (sort === "Price from low to Heigh") {
        sortOrder = { price: 1 }
    } else if (sort === "Price from Heigh to low") {
        sortOrder = { price: -1 }
    }
    try {
        const all_products = await ProductModel.find({}).sort(sortOrder)

        res.status(200).json({ msg: "product list here...", Products: all_products })
        // console.log( sortOrder)
    } catch (error) {
        res.status(401).json({ msg: "failed to get product Data from Data Base", error_msg: error.message })
    }
})

productRoute.get("/get/products", async (req, res) => {
    const { category, sort } = req.query;
    sortOrder = {};
    if (sort === "Price from low to Heigh") {
        sortOrder = { price: 1 }
    } else if (sort === "Price from Heigh to low") {
        sortOrder = { price: -1 }
    }
    try {
        const get_products = await ProductModel.find({ category }).sort(sortOrder)

        res.status(200).json({ msg: "product list here...", Products: get_products })
        // console.log(category, sortOrder)
    } catch (error) {
        res.status(401).json({ msg: "failed to get product Data from Data Base", error_msg: error.message })
    }
})



productRoute.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const Product_info = await ProductModel.findById(id)
        res.status(200).json({ msg: "Here is your product details", Target: Product_info })
        console.log(Product_info)
    } catch (error) {
        res.status(405).json({ Error_msg: error.message })
    }
})

productRoute.get("/:id/random", async (req, res) => {
    try {
        const randomProducts = await ProductModel.aggregate([
            { $sample: { size: 3 } }
        ]);
        res.status(200).json({ msg: "Here are your random product details", Data: randomProducts });
        console.log(randomProducts);
        console.log("sdsffffffffffffffffffffffffffffsadgfggggggggggggggggggggggggggggggggggggggggggggggggggg")
    } catch (error) {
        res.status(405).json({ Error_msg: error.message });
    }
});

module.exports = { productRoute }