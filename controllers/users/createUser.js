const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const insertUser = require("../../repositiries/users/insertUser");
const selectUserByEmail = require("../../repositiries/users/selectUserByEmail");

const createUser = async (req, res, next) => {
    try {

        const { username, email, passwd } = req.body;

        const userWithSameEmail = await selectUserByEmail(email);

        if(userWithSameEmail){
            const error = new Error("Already exists an user with that email");
            error.statusCode = 400;
            throw error;
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

        // res.status(201).send({
        //     status: "ok",
        //     data: {
        //         id:insertId,
        //         ...userData
        //     },
        // });
        
    } catch (error) {
        next(error);
    }
}

module.exports = createUser;