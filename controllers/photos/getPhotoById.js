const selectPhotoById = require("../../repositiries/photos/selectPhotoById");

const getPhotoById = async (req, res, next) => {

    try {
        const { photoId } = req.params;

        const photo = await selectPhotoById(photoId);

        if(!photo){
            const error = new Error("Photo does not exists");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).send({ status: "ok", data: photo });
        
    } catch (error) {
        next(error);
    }
};

module.exports = getPhotoById;