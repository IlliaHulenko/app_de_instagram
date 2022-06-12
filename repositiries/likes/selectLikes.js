const getPool = require("../../database/getPool");

const selectLikes = async () => {

    const pool = getPool();

    const [likes] = await pool.query("SELECT * FROM likes");

    return likes;
}

module.exports = selectLikes;