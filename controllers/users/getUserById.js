const selectUserById = require("../../repositiries/users/selectUserById");
const generateError = require("../../helpers/generateError");

const getUserById = async (req, res, next) => {

    try {
        const { userId } = req.params;

        const user = await selectUserById(userId);

        if(!user){
            generateError("User does not exists", 404);
        }

        res.status(200).send({ status: "ok", data: user });
        
    } catch (error) {
        next(error);
    }
};

module.exports = getUserById;