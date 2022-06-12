const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const insertUser = require("../../repositiries/users/insertUser");
const selectUserByEmail = require("../../repositiries/users/selectUserByEmail");
const generateError = require("../../helpers/generateError");

const createUser = async (req, res, next) => {
    try {

        const { username, email, passwd } = req.body;

        const userWithSameEmail = await selectUserByEmail(email);

        if(userWithSameEmail){
            generateError("Already exists an user with that email", 400);
        }

        const encryptedPassword = await bcrypt.hash(passwd, 10);

        const registrationCode = uuidv4();

        // const userData = { username, email, encryptedPassword, registrationCode };

        // const insertId = await insertUser(userData);

        const insertId = await insertUser({
            username, 
            email, 
            encryptedPassword, 
            registrationCode
        });

        res.status(201).send({ status: "ok", data: { id: insertId }});
        
    } catch (error) {
        next(error);
    }
}

module.exports = createUser;