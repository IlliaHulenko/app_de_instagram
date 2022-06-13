const getPool = require("../../database/getPool");

const selectComments = async () => {

    const pool = getPool();

    const [comment] = await pool.query("SELECT * FROM comments");

    return comment;
}

module.exports = selectComments;