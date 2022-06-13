const getPool = require("../../database/getPool");

const insertLike = async ({ user_id, photoId }) => {

    const pool = getPool();

    const [{ insertId }] = await pool.query(
        "INSERT INTO likes(user_id, photo_id) VALUES (?, ?)",
        [user_id, photoId]
    );

    return insertId;
};

module.exports = insertLike;