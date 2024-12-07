const express = require('express');
const multer = require('multer');
const { storage } = require('../Config/cloudnaryConfig.js');
const Image = require('../models/image.model.js');

const imageRouter = express.Router();
const upload = multer({ storage });

imageRouter.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = req.file;
        const newImage = new Image({
            url: result.path,
            public_id: result.filename,
        });
        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

imageRouter.get("/get", async (req, res) => {
    try {
        const image_collecion = await Image.find({})

        res.status(200).json({ message: "your image collection", data:image_collecion })
    } catch (error) {
        res.status(404).send(image_collecion)
    }

})

module.exports = { imageRouter };




























