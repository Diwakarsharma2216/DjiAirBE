const mongoose = require("mongoose");

const admin_Schema = mongoose.Schema({
    admin_name: { type: String },
    email: { type: String },
    password: { type: String },
}, { timestamps: true })
const productSchema = mongoose.Schema({
    cover_img: { type: String, require: true },
    background_img: String,
    discription: { type: String, require: true },
    background_title: String,
    price: { type: String, require: true },
    category: String,
    video_url: String,
    images: [String],
}, { timestamps: true })


const AdminModel = mongoose.model("admin", admin_Schema);
const ProductModel = mongoose.model('product', productSchema);

module.exports = { ProductModel, AdminModel };