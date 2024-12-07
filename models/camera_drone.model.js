// const mongoose = require("mongoose");

// const data = mongoose.Schema({
//     img_url: { type: String, required: true },
//     pro_title: { type: String, required: true },
//     buy_url: { type: String, required: true },
//     pro_weight: { type: String, required: true },
//     flight_time: { type: String, required: true },
//     camera_info: { type: String, required: true },
//     camera_photo_reso: { type: String, required: true },
//     tx_range: { type: String, required: true }
//     // add more as per your requirements...


// })


// const data2 = mongoose.Schema({
//     img_url: { type: String, required: true },
//     pro_title: { type: String, required: true },
//     buy_url: { type: String, required: true },
//     pro_weight: { type: String, required: true },
//     flight_time: { type: String, required: true },
//     camera_info: { type: String, required: true },
//     camera_angle: { type: String, required: true },
//     discription: { type: String, required: true }
//     // add more as per your requirements...


// })



// const aerialSchema = new mongoose.Schema({
//     Aerial: [data]
// });


// const immersiveSchema = new mongoose.Schema({
//     Immersive: [data2]
// });
// const ImmersiveModel = mongoose.model("immersive_data", immersiveSchema)
// const AerialModel = mongoose.model("aerial_data", aerialSchema);
// module.exports = { AerialModel, ImmersiveModel }


const mongoose = require("mongoose");

const droneSchema = mongoose.Schema({
    img_url: { type: String, required: true },
    pro_title: { type: String, required: true },
    buy_url: { type: String, required: true },
    pro_weight: { type: String, required: true },
    flight_time: { type: String, required: true },
    camera_info: { type: String, required: true },
    camera_photo_reso: { type: String, required: true },
    tx_range: { type: String, required: true }
});

const immersiveDroneSchema = mongoose.Schema({
    img_url: { type: String, required: true },
    pro_title: { type: String, required: true },
    buy_url: { type: String, required: true },
    pro_weight: { type: String, required: true },
    flight_time: { type: String, required: true },
    camera_info: { type: String, required: true },
    camera_angle: { type: String, required: true },
    discription: { type: String, required: true }
});

const aerialSchema = new mongoose.Schema({
    drones: [droneSchema]
});

const immersiveSchema = new mongoose.Schema({
    drones: [immersiveDroneSchema]
});

const AerialModel = mongoose.model("Aerial", aerialSchema);
const ImmersiveModel = mongoose.model("Immersive", immersiveSchema);

module.exports = { AerialModel, ImmersiveModel };