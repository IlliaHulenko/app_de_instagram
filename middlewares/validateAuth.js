const jwt = require("jsonwebtoken");
const generateError = require("../helpers/generateError");


const validateAuth = async (req, res, next) => {
    try {

        const { authorization } = req.headers;
        
        if(!authorization){
            generateError("Missing autorization header", 400);
        }

        const [tokenType, token] = authorization.split(" ");

        console.log(tokenType, token);

        if(tokenType !== "Bearer" || !token){
            generateError("Invalid token format", 400);
        }

        const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);

        req.auth = tokenInfo;

        next();

    } catch (error) {
        next(error);
    }
}

module.exports = validateAuth;