import mongoose from "mongoose";
const schema = mongoose.Schema;
const userProfileSchema = new schema(
    {
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        username: {type: String, unique: true, required: true},
        walletAddress: {type: String, unique: true, required: true},
        role: {type: String, required: true},
        verified: {type: Boolean, default: false},
    },
    {versionKey: false}
);
export default {userProfileSchema};

