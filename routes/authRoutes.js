import express from "express";
import signUpController from "../controller/SignUpController/signUpController.js"
import signUpRequestValidator from "../middleware/SignUpHandler/RequestValidator/requestValidator.js";
import routerErrorHandler from "../middleware/GenericHandler/routerErrorHandler/routerErrorHandler.js";
import signInController from "../controller/SignInController/signInController.js";
import signInRequestValidator from "../middleware/SignInHandler/RequestValidator/requestValidator.js";
import authTokenValidator from "../middleware/AuthenticationHandler/authTokenValidator.js";
import indexHandler from "../middleware/GenericHandler/IndexHandler/indexHandler.js";
import otpRequestValidator from  "../middleware/OTPHandler/OTPRequestHandler/requestValidator.js";
import otpGenerationController from "../controller/OTPController/otpGenerationController.js";
import otpVerificationController from "../controller/OTPController/otpVerificationController.js";
import otpVerificationValidator from "../middleware/OTPHandler/OTPVerificationHandler/requestValidator.js";
const authRouteHandler = express.Router();
try{
    authRouteHandler.post("/signup/",signUpRequestValidator.requestValidator,
        signUpController.signUpController);
    authRouteHandler.post('/signin/',signInRequestValidator.requestValidator,
        signInController.signInController);
    authRouteHandler.post("/request-otp/", otpRequestValidator.requestValidator,
        otpGenerationController.otpGenerationController)
    authRouteHandler.post("/verify-otp/",otpVerificationValidator.requestValidator,
        otpVerificationController.otpVerificationController)
    authRouteHandler.post('/auth/',authTokenValidator.authTokenValidator, indexHandler.indexHandler);
}
catch(e){
    console.log("Auth Route Handler Error");
    console.log(e);
    authRouteHandler.use(routerErrorHandler.routerErrorHandler);
}
export default authRouteHandler;