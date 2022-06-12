const selectUserProfile = require("../../repositiries/users/selectUserProfile");
const generateError = require("../../helpers/generateError");

const getUserProfile = async (req, res, next) => {

    try {
        const { userId } = req.params;

        const user = await selectUserProfile(userId);

        if(!user){
            generateError("User does not exists", 404);
        }

        res.status(200).send({ status: "ok", data: user });
        
    } catch (error) {
        next(error);
    }
};

module.exports = getUserProfile;