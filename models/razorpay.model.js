const mongoose = require("mongoose");

const razorpaySchema = mongoose.Schema({
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true }
})

const Razorpay_Payment = mongoose.model("payment", razorpaySchema)
module.exports = { Razorpay_Payment }