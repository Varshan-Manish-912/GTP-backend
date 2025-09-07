import userProfileModel from "../../model/UserProfileModel/userProfileModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();
async function signUpController(request, response){
    try{
        const {username, password, email, walletAddress, role} = request.body;
        const passwordHash = await bcrypt.hash(password,10);
        const userProfile = new userProfileModel({
            username: username,
            password: passwordHash,
            email: email,
            walletAddress: walletAddress,
            role: role,
            }
        );
        await userProfile.save();
        const JWTToken = await jwt.sign(
            {username: userProfile.username, userID: userProfile._id, email: userProfile.email,
                role: userProfile.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRY}
        );
        response.status(200).json({responseMessage: "Signed Up User Successfully", authToken: JWTToken});
    }
    catch(e){
        console.log("Error: "+ e);
        if(e.code === 11000){
            const field = Object.keys(e.keyValue)[0];
            response.status(400).json({responseMessage: `Invalid Credentials: ${field} already exists`});
        }
        response.status(500).json({responseMessage: "Error Occurred In Signup Controller"});
    }
}
export default {signUpController};