import jwt from "jsonwebtoken";
function authTokenValidator(request, response, next){
    try{
        const authHeader = request.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer")){
            const token = authHeader.split(" ")[1];
            request.user = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } else{
            response.status(400).json({responseMessage: "Invalid Header: Authentication Token Not Found"});
        }
    } catch(e){
        console.log(e);
        if (e.name === "TokenExpiredError") {
            return response.status(400).json({ responseMessage: "Authentication Error: Token expired" });
        } else if (e.name === "JsonWebTokenError") {
            return response.status(400).json({ responseMessage: "Authentication Error: Invalid token" });
        } else {
            return response.status(400).json({ responseMessage: "Authentication Error: " +
                    "Authentication Failed" });
        }
    }
}
export default {authTokenValidator};