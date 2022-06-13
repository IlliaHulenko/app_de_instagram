const getPool = require("../../database/getPool");

const selectCommentById = async (commentId) => {
    const pool = getPool();

    const [[comment]] = await pool.query("SELECT * FROM comments WHERE comments_id = ?", [commentId]);

    return comment;
} 

module.exports = selectCommentById;