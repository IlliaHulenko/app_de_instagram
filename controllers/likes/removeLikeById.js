const deleteLike = require("../../repositiries/likes/deleteLike");
const selectLikeById = require("../../repositiries/likes/selectLikeById");
const generateError = require("../../helpers/generateError");

const removeLikeById = async (req, res, next) => {
    try {
        const { likeId } = req.params;        

        const likeDB = await selectLikeById(likeId);       

        if(!likeDB){
            generateError("Like does not exists", 404)        
       } 

       const userId = req.auth.id;

        await deleteLike(likeId);  

        res.status(200).send({ status: "ok", message: "Like deleted"});

    } catch (error) {
        next(error);
    }
}

module.exports = removeLikeById;