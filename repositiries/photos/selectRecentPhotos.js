const getPool = require("../../database/getPool");

const selectRecentPhotos = async () => {

    const pool = getPool();

    const [photo] = await pool.query(
        `SELECT ph.name_photo, u.username FROM photo ph
        INNER JOIN users u ON ph.user_id = u.id
        ORDER BY ph.created_at DESC;
        `);

    return photo;
}

module.exports = selectRecentPhotos;