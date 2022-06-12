const selectPhotoById = require("../../repositiries/photos/selectPhotoById");
const generateError = require("../../helpers/generateError");

const getPhotoById = async (req, res, next) => {

    try {
        const { photoId } = req.params;

        const photo = await selectPhotoById(photoId);

        if(!photo){
            generateError("Photo does not exists", 404);            
        }

        res.status(200).send({ status: "ok", data: photo });
        
    } catch (error) {
        next(error);
    }
};

module.exports = getPhotoById;