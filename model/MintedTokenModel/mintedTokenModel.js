import mintedTokenSchema from "./mintedTokenSchema.js";
import mongoose from "mongoose";
const mintedTokenModel = mongoose.models.Minted_Token ||
    mongoose.model("Minted_Token",mintedTokenSchema.mintedTokenSchema,"P2PMarketplace");
export default mintedTokenModel;