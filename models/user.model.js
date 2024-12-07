const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    re_password: { type: String},
    profile_picture:{type: String},
    cart:[],
    shop_history:[],
})

const UserModel = mongoose.model("user", userSchema);


module.exports = { UserModel }