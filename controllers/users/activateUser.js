
const selectUserByActivationCode = require("../../repositiries/users/selectUserByActivationCode");
const deleteRegistrationCode = require("../../repositiries/users/deleteRegistrationCode");

const activateUser = async (req, res, next) => {
    try {
        const {registrationCode} = req.params;
        
        const user = await selectUserByActivationCode(registrationCode);

        if(!user){
            const error = new Error("Invalid registration code or alread activated");
            error.statusCode = 404;
            throw error;
        }

        await deleteRegistrationCode(user.id);

        res.status(200).send({ status: "ok", message: "User activated" });
    } catch (error) {
        next(error);
    }
}

module.exports = activateUser;