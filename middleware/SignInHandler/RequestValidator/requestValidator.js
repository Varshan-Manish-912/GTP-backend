function requestValidator(request,response,next){
    try{
        const {username, password, email} = request.body;
        if((!username && !email)){
            return response.status(400).json({responseMessage: "Invalid Request Payload: " +
                    "No Username or Password Provided"});
        }
        else{
            if(username){
                const usernameRegex = /^[a-zA-Z0-9]+$/;
                if (!usernameRegex.test(username)) {
                    return response.status(400).json({
                        responseMessage: "Invalid Request Payload: Username Must Be Alphanumeric Only"
                    });
                }
            }
            else{
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return response.status(400).json({
                        responseMessage: "Invalid Request Payload: Email format is invalid"
                    });
                }
            }
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
            if (!passwordRegex.test(password)) {
                return response.status(400).json({
                    responseMessage: "Invalid Request Payload: Password Must be Atleast 8" +
                        " Characters With Atleast One Uppercase Lowercase Special Character and Number"
                });
            }
            next();
        }
    } catch(e){
        console.log(e);
        return response.status(500).json({responseMessage:"Internal Server Error In SignIn Request Validator"});
    }
}
export default {requestValidator}