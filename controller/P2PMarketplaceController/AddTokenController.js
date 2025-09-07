import mintedTokenModel from "../../model/MintedTokenModel/mintedTokenModel.js";
async function addTokenController(request, response){
    try{
        const {tokenID} = request.body;
        const metadataURI = request.metadataURI;
            const mintedToken = new mintedTokenModel({
                tokenID: tokenID,
                CID: metadataURI,
                }
            );
            await mintedToken.save();
            response.status(200).json({responseMessage:"Token Added Successfully"});
    }
    catch(e){
        console.log(e);
        if(e.code === 11000){
            const field = Object.keys(e.keyValue)[0];
            response.status(400).json({responseMessage: `Invalid Token: ${field} already exists`});
        }
        response.status(500).json({responseMessage: "Internal Server Error: P2P Add Token Controller Error"});
    }
}
export default {addTokenController};