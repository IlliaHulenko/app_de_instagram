
const insertLike = require("../../repositiries/likes/insertLike");

const createLike = async (req, res, next) => {
    try {        
        const user_id = req.auth.id;
        
        const { photo_id } = req.body;        

        const insertId = await insertLike({ user_id, photo_id });

        res.status(201)
            .send({ 
                status: "ok", 
                data: { id: insertId, 
                    user_id, 
                    photo_id}
            });

    } catch (error) {
        next(error);
    }
}

module.exports = createLike;