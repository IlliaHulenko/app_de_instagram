
const insertLike = require("../../repositiries/likes/insertLike");

const createLike = async (req, res, next) => {
    try {        
        const user_id = req.auth.id;
        
        const { photoId } = req.params;              

        const insertId = await insertLike({ user_id, photoId });
        

        res.status(201)
            .send({ 
                status: "ok", 
                data: { id: insertId, 
                    user_id, 
                    photoId}
            });

    } catch (error) {
        next(error);
    }
}

module.exports = createLike;