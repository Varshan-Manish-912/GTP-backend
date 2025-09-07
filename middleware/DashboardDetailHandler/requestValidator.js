import userProfileModel from "../../model/UserProfileModel/userProfileModel.js";
async function requestValidator(request,response,next){
    try{
        const {walletAddress} = request.body;
        const ethAddressRegex = /^0X[a-fA-F0-9]{40}$/;
        if (!ethAddressRegex.test(walletAddress)) {
            return response.status(400).json({
                responseMessage: "Invalid Request Payload: Wallet Address is Invalid"
            });
        }
        const userProfile = await userProfileModel.findOne({walletAddress: walletAddress});
        if (userProfile) {
            request.userProfile = userProfile;
            next();
        }
        else{
            response.status(400).json({responseMessage:
                    "Invalid Request Payload: No Registered Wallet Address Found"});
        }
    }
    catch(e){
        console.log(e);
        response.status(500).json({responseMessage:
                "Internal Server Error: Dashboard Detail Request Validation Error"});
    }
}
export default {requestValidator};