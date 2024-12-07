const express = require('express');
require("dotenv").config()
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const crypto = require("crypto")
const Razorpay = require("razorpay");
const { Razorpay_Payment } = require('../models/razorpay.model.js');
const { UserModel } = require('../models/user.model.js');
// const { sendEmail } = require("../routes/send.email.routes.js")
const paymentRouter = express.Router();
paymentRouter.use(express.json());
paymentRouter.use(express.urlencoded({ extended: true }));

// Creating razorpay instance here...
var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


paymentRouter.get("/get/key", (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_KEY_ID,
    })
})


paymentRouter.post("/checkout", async (req, res) => {
    // try {
    //     const { amount, uid, } = req.body;
    //     if (!amount) {
    //         throw new Error("Amount is required");
    //     }

    //     const options = {
    //         // converting usd $ to rupees ₹
    //         amount: amount * 100,
    //         currency: "INR",
    //         receipt: uid,
    //         // offer_id: user_email,
    //     };
    //     const order = await instance.orders.create(options);

    //     res.status(200).json({
    //         order: order,
    //     });
    //     console.log("order",order)
    // } catch (error) {
    //     console.error('Error creating order:', error);
    //     res.status(500).json({
    //         message: 'An error occurred during the checkout process',
    //         error: error.message
    //     });
    // }

    try {
        const { amount, uid } = req.body;

        if (!amount) {
            throw new Error("Amount is required");
        }

        const options = {
            amount: amount * 100, // Convert amount to paise
            currency: "INR",
            receipt: uid,
        };

        const order = await instance.orders.create(options);

        res.status(200).json({
            order: order,
        });

        console.log("Order created:", order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            message: 'An error occurred during the checkout process',
            error: error.message
        });
    }
})


paymentRouter.post("/paymentVerification", async (req, res) => {

    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log('Request body:', req.body); // Loging the request body

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        console.log(body)
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex");
        console.log("sig rec", razorpay_signature);
        console.log("sig gen", expectedSignature);
        if (expectedSignature === razorpay_signature) {
            // here we add signature to data base....
            await Razorpay_Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            })
            // redirect user to success page...

            res.redirect(`https://dji-global.netlify.app/success/payment?reference=${razorpay_payment_id}`)
        } else {
            return res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            message: 'An error occurred during the payment verification process',
            success: false,
            error: error.message
        });
    }
})



const sendEmail = async ({ to, subject, orderId }) => {
    if (!to || !subject || !orderId) {
        throw new Error('Missing parameters for sendEmail function');
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });
    try {
        // send mail with defined transport object
        const emailTemplatePath = path.join(__dirname, 'EmailTemplates', 'conf_payment.ejs');
        const html = await ejs.renderFile(emailTemplatePath, { orderId });
        const info = await transporter.sendMail({
            from: `"DJI Official" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email: ", error.message);
        return { success: false, error: "Error sending email" };
    }
}




paymentRouter.post("/sendPaymentMail", async (req, res) => {
    const { email, reff_id } = req.body
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            const emailResponse = await sendEmail({
                to: email,
                subject: "Purchase Confirmation",
                orderId: reff_id
            });
            if (emailResponse.success) {
                return res.status(200).json({ msg: "email successfully sent to user", email: email })
            } else {
                return res.status(500).json({ msg: "Failed to send purchase confirmation email", error: emailResponse.error });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ msg: "req failed || denied bt server...", error_msg: error.message })
    }
})










module.exports = { paymentRouter };