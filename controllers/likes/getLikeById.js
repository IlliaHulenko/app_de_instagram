const selectLikeById = require("../../repositiries/likes/selectLikeById");
const generateError = require("../../helpers/generateError");

const getLikeById = async (req, res, next) => {

    try {
        const { likeId } = req.params;

        const like = await selectLikeById(likeId);

        if(!like){
            generateError("Like does not exists", 404);            
        }

        res.status(200).send({ status: "ok", data: like });
        
    } catch (error) {
        next(error);
    }
};

module.exports = getLikeById;