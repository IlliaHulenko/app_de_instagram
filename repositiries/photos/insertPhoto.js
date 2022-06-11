const getPool = require("../../database/getPool");

const insertPhoto = async ({ name_photo, description_photo, user_id }) => {

    const pool = getPool();

    const [{ insertId }] = await pool.query(
        "INSERT INTO photo (name_photo, description_photo, user_id ) VALUES (?, ?, ?)",
        [name_photo, description_photo, user_id ]
    );

    return insertId;
};

module.exports = insertPhoto;