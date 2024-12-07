const express = require("express");
require("dotenv").config();
const { AerialModel, ImmersiveModel } = require("../models/camera_drone.model.js")

const cameraRouter = express.Router();
cameraRouter.use(express.json());

cameraRouter.post("/add/aerial", async (req, res) => {
    const { drones } = req.body;

    if (!drones || !Array.isArray(drones) || drones.length === 0) {
        return res.status(401).json({ msg: "Invalid or missing drones data" });
    }

    try {
        const data = new AerialModel({ drones });
        await data.save();
        res.status(200).json({ msg: "Data added successfully", added_data: data });
    } catch (error) {
        res.status500().json({ msg: "Failed to add camera drones data", error: error.message });
    }
});


cameraRouter.post("/add/immersive", async (req, res) => {
    const { drones } = req.body;

    if (!drones || !Array.isArray(drones) || drones.length === 0) {
        return res.status(401).json({ msg: "Invalid or missing drones data" });
    }

    try {
        const data = new ImmersiveModel({ drones });
        await data.save();
        res.status(200).json({ msg: "Data added successfully", added_data: data });
    } catch (error) {
        res.status(500).json({ msg: "Failed to add camera drones data", error: error.message });
    }
});


cameraRouter.get("/get/immersive", async (req, res) => {
    try {
        const getData = await ImmersiveModel.find();
        res.status(200).json({ msg: "Getting data successful", get_data: getData });
    } catch (error) {
        res.status(500).json({ msg: "Failed to get camera drones data", error: error.message });
    }
});

cameraRouter.get("/get/aerial", async (req, res) => {
    try {
        const getData = await AerialModel.find();
        res.status(200).json({ msg: "Getting data successful", get_data: getData });
    } catch (error) {
        res.status(500).json({ msg: "Failed to get camera drones data", error: error.message });
    }
});

module.exports = { cameraRouter };