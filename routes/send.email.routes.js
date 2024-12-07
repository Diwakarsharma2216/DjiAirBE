const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const ejs = require("ejs");
const path = require("path");
const emailRouter = express.Router();
emailRouter.use(express.json());


// sendEmail fnction (Controller) ....
const sendEmail = async (req, res) => {
    const { to, subject, email } = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    try {
        // send mail with defined transport object
        const emailTemplatePath = path.join(__dirname, 'EmailTemplates', 'welcomeEmail.ejs');
        const html = await ejs.renderFile(emailTemplatePath, { email });
        const info = await transporter.sendMail({
            from: `"DJI Official" <${process.env.EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            // plain text body
            html, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email: ", error);
        return { success: false, error: "Error sending email" };
    }
}


emailRouter.post("/email", sendEmail)


module.exports = { emailRouter, sendEmail };
