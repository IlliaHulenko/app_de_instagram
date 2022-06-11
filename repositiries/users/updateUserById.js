const getPool = require("../../database/getPool");

const updateUserById = async ({ username, email, passwd, id }) => {

    const pool = getPool();

    const [{ affectedRows }] = await pool.query(
        "UPDATE users SET username = ?, email = ?, passwd = ? WHERE id = ?",
        [username, email, passwd, id ]
    );

    return affectedRows;
};

module.exports = updateUserById;