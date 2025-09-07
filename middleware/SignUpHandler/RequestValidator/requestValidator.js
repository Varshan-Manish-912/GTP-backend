function requestValidator(request, response, next) {
    try {
        const {username, password, email, walletAddress, role} = request.body;
        if (!username || !password || !email || !walletAddress) {
            return response.status(400).json({
                responseMessage: "Invalid Request Payload: Missing Required Credentials"
            });
        }
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(username)) {
            return response.status(400).json({
                responseMessage: "Invalid Request Payload: Username Must Be Alphanumeric Only"
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return response.status(400).json({
                responseMessage: "Invalid Request Payload: Email format is invalid"
            });
        }
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return response.status(400).json({
                responseMessage: "Invalid Request Payload: Password Must be Atleast 8" +
                    " Characters With Atleast One Uppercase Lowercase Special Character and Number"
            });
        }
        const ethAddressRegex = /^0X[a-fA-F0-9]{40}$/;
        if (!ethAddressRegex.test(walletAddress)) {
            return response.status(400).json({
                responseMessage: "Invalid Request Payload: Wallet Address is Invalid"
            });
        }
        if (role !== "PEER" && role !== "VENDOR") {
            return response.status(400).json({
                responseMessage: "Invalid Request Payload: Role is Invalid"
            })
        }
        next();
    } catch (e) {
        console.log(e);
        return response.status(500).json({responseMessage: "Internal Server Error In" +
                " Request Validation Middleware"});
    }
}
export default {requestValidator};
