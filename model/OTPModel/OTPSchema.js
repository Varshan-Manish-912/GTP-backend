import mongoose from "mongoose";
const schema = mongoose.Schema;
const OTPSchema = new schema({
    email: {type: String, unique: true, required: true},
    OTP: {type: String, required: true},
    }, {versionKey: false, timestamps: true}
);
export default {OTPSchema};