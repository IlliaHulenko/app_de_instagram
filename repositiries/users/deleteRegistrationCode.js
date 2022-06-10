const getPool = require("../../database/getPool");

const deleteRegistrationCode = async (userId) => {

    const pool = getPool();

    const [{ affectedRows }] = await pool.query(
        "UPDATE users SET registrationcode = NULL WHERE id = ?", [userId]
    );

    return affectedRows;
};

module.exports = deleteRegistrationCode;