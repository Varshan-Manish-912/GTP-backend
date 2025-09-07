import mintedTokenModel from "../../../model/MintedTokenModel/mintedTokenModel.js";
async function requestValidator(request,response,next){
    try{
        const {tokenID} = request.body;
        if(!tokenID){
            response.status(400).send({responseMessage: "Invalid Request Payload: No TokenID Found"});
        }
        if(await mintedTokenModel.findOne({tokenID:tokenID})){
            next();
        }
        else{
            response.status(400).send({responseMessage:
                    "Invalid Request Payload: No Such TokenID Found In Market"});
        }
    }
    catch(e){
        console.log(e);
        response.status(500).json({responseMessage:
                "Internal Server Error Occurred In Token Exit Request Handler"});
    }
}
export default {requestValidator};