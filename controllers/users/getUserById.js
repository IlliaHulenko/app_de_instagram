const selectUserById = require("../../repositiries/users/selectUserById");

const getUserById = async (req, res, next) => {

    try {
        const { userId } = req.params;

        const user = await selectUserById(userId);

        if(!user){
            const error = new Error("User does not exists");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).send({ status: "ok", data: user });
        
    } catch (error) {
        next(error);
    }
};

module.exports = getUserById;