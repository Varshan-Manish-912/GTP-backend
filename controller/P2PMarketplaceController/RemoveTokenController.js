import mintedTokenModel from "../../model/MintedTokenModel/mintedTokenModel.js";
async function removeTokenController(request, response){
   try{
       await mintedTokenModel.deleteOne({tokenID: request.body.tokenID});
       response.status(200).send({responseMessage: "Token Removed From Marketplace Successfully"});
   }
   catch(e){
       console.log(e);
       response.status(500).json({responseMessage:
               "Internal Server Error Occurred In Remove Token Controller"});
   }
}
export default {removeTokenController}