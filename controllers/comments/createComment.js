
const insertComment = require("../../repositiries/comments/insertComment");

const createComment = async (req, res, next) => {
    try {        
        const user_id = req.auth.id;

        const { comments } = req.body;
        
        const { photoId } = req.params;                     

        const insertId = await insertComment({ comments, user_id, photoId });        

        res.status(201)
            .send({ 
                status: "ok", 
                data: { id: insertId, 
                    comments,
                    user_id, 
                    photoId}
            });

    } catch (error) {
        next(error);
    }
}

module.exports = createComment;