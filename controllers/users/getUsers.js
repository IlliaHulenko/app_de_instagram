const selectUsers = require("../../repositiries/users/selectUsers");

const getUsers = async (req, res, next) => {

    try {
        const users = await selectUsers();

        res.status(200).send({ status: "ok", data: users });

    } catch (error) {
        next(error);
    }
}

module.exports = getUsers;