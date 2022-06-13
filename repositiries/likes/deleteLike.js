const getPool = require("../../database/getPool");

const deleteLike = async (likeId) => {

    const pool = getPool();

    const [{ affectedRows }] = await pool.query(
        "DELETE FROM likes WHERE like_id = ?", [likeId]
    );

    return affectedRows;
};

module.exports = deleteLike;