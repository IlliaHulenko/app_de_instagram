const selectComments = require("../../repositiries/comments/selectComments");

const getComments = async (req, res, next) => {

    try {
        const comment = await selectComments();

        res.status(200).send({ status: "ok", data: comment });

    } catch (error) {
        next(error);
    }
}

module.exports = getComments;