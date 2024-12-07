const express = require("express");
const { PageModel } = require("../models/product.pages.model.js")
const Dynamic_Pages_Router = express.Router();

Dynamic_Pages_Router.post("/pages/info", async (req, res) => {
    // this route will add images,videos,price of products for dynamic pages...
    const {
        PRODUCT_NAME,
        INIT_VIDEO,
        TEXT_VIDEO,
        RKT_VIDEO1,
        RKT_VIDEO2,
        ACTUAL_PRO_IMAGE,
        WAYPOINT_PRO_VID,
        DARK_IMG,
        TAB_VID1,
        TAB_VID2,
        TAB_VID3,
        FINAL_PRO_IMG,
        PRICE
    } = req.body

    try {
        const page = new PageModel({
            PRODUCT_NAME,
            INIT_VIDEO,
            TEXT_VIDEO,
            RKT_VIDEO1,
            RKT_VIDEO2,
            ACTUAL_PRO_IMAGE,
            WAYPOINT_PRO_VID,
            DARK_IMG,
            TAB_VID1,
            TAB_VID2,
            TAB_VID3,
            FINAL_PRO_IMG,
            PRICE
        })
        await page.save()
        res.status(200).json({ msg: "page data added", data: req.body })
    } catch (error) {
        res.status(400).json({ msg: "page data not added", error: error.message })
    }
})


Dynamic_Pages_Router.get("/page/:id", async(req, res) => {
    const {id} = req.params;
    try {
        const pro = await PageModel.findById(id);
        if (!pro) {
            return res.status(404).json({ message: 'product page not found' });
        }
        res.status(200).json({ "page_data": pro });
    } catch (error) {
        res.status(500).json({ message: 'Server error to find page data', error: error.message });
    }
})
module.exports = { Dynamic_Pages_Router }