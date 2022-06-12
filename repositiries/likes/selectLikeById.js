const getPool = require("../../database/getPool");

const selectLikeById = async (like_id) => {
    const pool = getPool();

    const [[like]] = await pool.query("SELECT * FROM likes WHERE like_id = ?", [like_id]);

    return like;
} 

module.exports = selectLikeById;