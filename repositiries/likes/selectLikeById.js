const getPool = require("../../database/getPool");

const selectLikeById = async (likeId) => {
    const pool = getPool();

    const [[like]] = await pool.query("SELECT * FROM likes WHERE like_id = ?", [likeId]);

    return like;
} 

module.exports = selectLikeById;