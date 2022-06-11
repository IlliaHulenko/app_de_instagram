const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const selectUserByEmail = require("../../repositiries/users/selectUserByEmail");


const loginUser = async (req, res, next) => {
    try {
        const { email, passwd } = req.body;       

        const user = await selectUserByEmail(email);  

        if(!user){
            const error = new Error("Incorrect password or email");
            error.statusCode = 400;
            throw error;
        }
        
        const encryptedPassword = user?.passwd;

        const isPasswordOk = user && (await bcrypt.compare(passwd, encryptedPassword));

        if(!isPasswordOk){
            const error = new Error("Incorrect password or email");
            error.statusCode = 400;
            throw error;
        }

        if(user.registrationcode){
            const error = new Error("User not activated. Check your email!");
            error.statusCode = 400;
            throw error;
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