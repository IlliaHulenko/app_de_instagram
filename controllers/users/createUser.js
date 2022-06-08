const insertUser = require("../../repositiries/users/insertUser");

const createUser = async(req, res, next) => {
    try {

        const { username, email, passwd } = req.body;

        if(!(username && email && passwd)){
            const error = new Error("User must have username, email and password");
            error.statusCode = 400;
            throw error;
        }

        const userData = { username, email, passwd };

        const insertId = await insertUser(userData);

        res.status(201).send({
            status: "ok",
            data: {
                id:insertId,
                ...userData
            },
        });
        
    } catch (error) {
        next(error);
    }
}

module.exports = createUser;