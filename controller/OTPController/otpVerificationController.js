import OTPModel from "../../model/OTPModel/OTPModel.js";
import UserProfileModel from "../../model/UserProfileModel/userProfileModel.js";
async function otpVerificationController(request, response){
    try{
        const {email, otp} = request.body;
        if(otp === request.recordOTP){
            await OTPModel.deleteOne({email: email});
            await UserProfileModel.updateOne(
                { email: email },
                { $set: { verified: true } }
            );
            response.status(200).json({responseMessage: "OTP Verified"});
        }
        else{
            response.status(400).json({responseMessageL:"Incorrect OTP"});
        }
    }
    catch(e){
        console.log(e);
        response.status(500).json({responseMessage:"Internal Server Error: OTP Verification Controller Error"});
    }
}
export default {otpVerificationController};