const getPool = require("../../database/getPool");

const selectUserByActivationCode = async (registrationCode) => {

    const pool = getPool();

    const [[user]] = await pool.query("SELECT * FROM users WHERE registrationcode = ?", 
    [registrationCode]
    );

    return user;
};

module.exports = selectUserByActivationCode;