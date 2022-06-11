const getPool = require("../../database/getPool");

const selectPhotoById = async (id) => {
    const pool = getPool();

    const [[photo]] = await pool.query("SELECT * FROM photo WHERE id = ?", [id]);

    return photo;
} 

module.exports = selectPhotoById;