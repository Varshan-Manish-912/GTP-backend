import OTPModel from "../../../model/OTPModel/OTPModel.js"
async function requestValidator(request,response,next){
    try{
        const {email, otp} = request.body;
        if(email && otp){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return response.status(400).json({
                    responseMessage: "Invalid Request Payload: Email format is invalid"
                });
            }
            const databaseRecord = await OTPModel.findOne({email: email});
            if(databaseRecord){
                request.recordOTP = databaseRecord.OTP;
                next();
            }
            else{
                response.status(400).json({responseMessage:"Invalid Request Payload: No OTP Found For Email"});
            }
        }
        else{
            response.status(400).json({responseMessage: "Invalid Request Payload: No Email Found"});
        }
    }
    catch(e){
        console.log(e);
    }
}
export default {requestValidator};