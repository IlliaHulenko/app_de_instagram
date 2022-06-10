const getPool = require("../../database/getPool");

const insertUser = async ({ username, email, encryptedPassword, registrationCode }) => {

    const pool = getPool();

    const [{ insertId }] = await pool.query(
        "INSERT INTO users (username, email, passwd, registrationCode) VALUES (?, ?, ?, ?)",
        [username, email, encryptedPassword, registrationCode]
    );

    return insertId;
};

module.exports = insertUser;