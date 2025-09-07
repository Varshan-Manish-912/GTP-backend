import mintedTokenModel from "../../model/MintedTokenModel/mintedTokenModel.js";
async function returnTokenController(request, response){
    console.log("Current file path:", import.meta.url);
    try{
       const mintedTokens = await mintedTokenModel.find();
       response.status(200).json({p2pMarketTokens: mintedTokens});
    }
    catch(e){
        console.log(e);
        response.status(500).json({responseMessage:"Internal Server Error Occurred In Token Return Controller"});
    }
}
export default {returnTokenController}