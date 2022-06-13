const getPool = require("../../database/getPool");

const insertComment = async ({ comments, user_id, photoId }) => {

    const pool = getPool();

    const [{ insertId }] = await pool.query(
        "INSERT INTO comments(comments, user_id, photo_id) VALUES (?, ?, ?)",
        [comments, user_id, photoId]
    );

    return insertId;
};

module.exports = insertComment;