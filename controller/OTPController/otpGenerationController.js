import OTPModel from "../../model/OTPModel/OTPModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {google} from "googleapis";
dotenv.config();
async function createTransporter(){
    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                console.log(err);
                // resolve(process.env.ACCESS_TOKEN);
                reject("Failed to create access token");
            }
            resolve(token);
        });
    });
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            accessToken: accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });
    return transporter;
}
async function sendEmail(email, otp){
    const transporter = await createTransporter();
    transporter.sendMail({
        subject: "One Time Password From GTP",
        text: `Your OTP is: ${otp} It Will Expire In 1 Minute`,
        to:email,
        from: process.env.EMAIL
    })
}
function generateSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}
async function otpGenerationController(request, response){
    try{
        const otp = generateSixDigitNumber();
        const email = request.body.email;
        const OTP =new OTPModel({
            email: email,
            OTP: otp
            }
        )
        await sendEmail(email, otp);
        await OTP.save();
        response.status(200).json({responseMessage:"OTP Generated Successfully"});
    }catch(e){
        console.log(e);
        response.status(500).json({responseMessage: "Internal Server Error: Error In OTP Controller"});
    }
}
export default {otpGenerationController};
