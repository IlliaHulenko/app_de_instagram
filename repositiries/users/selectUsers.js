const getPool = require("../../database/getPool");

const selectUsers = async () => {

    const pool = getPool();

    const [users] = await pool.query("SELECT * FROM users");

    return users;
}

module.exports = selectUsers;