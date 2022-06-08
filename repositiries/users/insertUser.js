const getPool = require("../../database/getPool");

const insertUser = async ({ username, email, passwd }) => {

    const pool = getPool();

    const [{ insertId }] = await pool.query(
        "INSERT INTO users (username, email, passwd) VALUES (?, ?, ?)",
        [username, email, passwd]
    );

    return insertId;
};

module.exports = insertUser;