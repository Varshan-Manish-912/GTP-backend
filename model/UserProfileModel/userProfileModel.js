import mongoose from "mongoose";
import userProfileSchema from "./userProfileSchema.js";
const userProfileModel = mongoose.models.User || mongoose.model("User",
    userProfileSchema.userProfileSchema,"UserProfiles");
export default userProfileModel;