const selectLikes = require("../../repositiries/likes/selectLikes");

const getLikes = async (req, res, next) => {

    try {
        const users = await selectLikes();

        res.status(200).send({ status: "ok", data: users });

    } catch (error) {
        next(error);
    }
}

module.exports = getLikes;