const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const selectUserByEmail = require("../../repositiries/users/selectUserByEmail");
const generateError = require("../../helpers/generateError");


const loginUser = async (req, res, next) => {
    try {
        const { email, passwd } = req.body;       

        const user = await selectUserByEmail(email);  

        if(!user){
            generateError("Incorrect password or email", 400);          
        }
        
        const encryptedPassword = user?.passwd;

        const isPasswordOk = user && (await bcrypt.compare(passwd, encryptedPassword));

        if(!isPasswordOk){
            generateError("Incorrect password or email", 400);
        }

        if(user.registrationcode){
            generateError("User not activated. Check your email!", 400);
        }

        const tokenPayload = { id: user.id };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });

        res.status(200).send({ status: "ok", data: { token }});

    } catch (error) {
        next(error);
    }
}

module.exports = loginUser;