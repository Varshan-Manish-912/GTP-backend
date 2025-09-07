import mongoose from "mongoose";
const schema = mongoose.Schema;
const mintedTokenSchema = schema({
        tokenID: {type: Number, unique: true, required: true},
        CID: {type: String, unique: true, required: true}
    }, {versionKey: false}
);
export default {mintedTokenSchema};