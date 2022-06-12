const getPool = require("../../database/getPool");

const selectUserProfile = async (id) => {
    const pool = getPool();

    const [user] = await pool.query(
        `SELECT ph.name_photo, u.username FROM photo ph
        INNER JOIN users u ON ph.user_id = u.id
        WHERE u.id = ?;`, [id]);

    return user;
} 

module.exports = selectUserProfile;