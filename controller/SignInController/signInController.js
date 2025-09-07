import userProfileModel from "../../model/userProfileModel/userProfileModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function signInController(request, response){
    try {
        const {username, email, password} = request.body;
        const userProfile = username ?
            await userProfileModel.findOne({username}): await userProfileModel.findOne({email});
        if (userProfile) {
            if(userProfile.verified === false){
                response.status(400).json({responseMessage: "Invalid Payload Request: KYC Unverified For User"});
            }
            if (bcrypt.compare(password, userProfile.password)) {
                const JWTToken = await jwt.sign(
                    {username: userProfile.username, userID: userProfile._id, email: userProfile.email,
                        role: userProfile.role},
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_EXPIRY}
                );
                response.status(200).json({responseMessage: "Signed In Successfully", authToken: JWTToken});
            }
            else{
                response.status(400).json({responseMessage: "Invalid Credentials: Password Incorrect"});
            }
        } else {
            response.status(400).json({responseMessage: "Invalid Credentials: Invalid Email/Username"});
        }
    }
    catch(e){
        console.log("Error Occurred During SignIn: " + e);
        response.status(500).json({responseMessage: "Error Occurred In signIn Controller"});
    }
}
export default {signInController};