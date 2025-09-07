import UserProfileModel from "../../../model/UserProfileModel/userProfileModel.js"
import OTPModel from "../../../model/OTPModel/OTPModel.js";
async function requestValidator(request, response, next){
    try{
        const {email} = request.body;
        if(email){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return response.status(400).json({
                    responseMessage: "Invalid Request Payload: Email format is invalid"
                });
            }
            if (await OTPModel.findOne({email: email})){
                response.status(400).json({responseMessage: "Invalid Request OTP Still Available"});
            }
            if(await UserProfileModel.findOne({email:email})){
                console.log(await UserProfileModel.findOne({email:email}));
                next();
            }
            else{
                response.status(400).json({responseMessage: "Invalid Request Payload: No Email Found"});
            }
        }
        else{
            response.status(400).json({responseMessage: "Invalid Request Payload: Email Missing"});
        }
    }
    catch(e){
        console.log(e);
        response.status(500).json({responseMessage: "Internal Server Error: Error In OTP Request Validator"});
    }
}
export default {requestValidator}
