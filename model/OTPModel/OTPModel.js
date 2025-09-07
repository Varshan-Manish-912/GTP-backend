import mongoose from "mongoose";
import OTPSchema from "./OTPSchema.js"
const OTPModel = mongoose.models.OTP ||
    mongoose.model("OTP", OTPSchema.OTPSchema, "OTPCollection");
export default OTPModel;