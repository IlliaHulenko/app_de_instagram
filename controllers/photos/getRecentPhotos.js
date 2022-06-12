const selectRecentPhotos = require("../../repositiries/photos/selectRecentPhotos");

const getRecentPhotos = async (req, res, next) => {

    try {
        const recentPhotos = await selectRecentPhotos();

        res.status(200).send({ status: "ok", data: recentPhotos });

    } catch (error) {
        next(error);
    }
}

module.exports = getRecentPhotos;