const jwt = require("jsonwebtoken");
const insertPhoto = require("../../repositiries/photos/insertPhoto");

const createPhoto = async (req, res, next) => {
    try {
        //const user_id = req.auth.id;
        const { id: user_id } = req.auth;

        const { name_photo, description_photo } = req.body;

        const insertId = await insertPhoto({ name_photo, description_photo, user_id });

        res
            .status(201)
            .send({ 
                status: "ok", 
                data: { id: insertId, 
                    name_photo, 
                    description_photo, 
                    user_id }
            });

    } catch (error) {
        next(error);
    }
}

module.exports = createPhoto;