require("dotenv").config();
const getPool = require("./getPool");

const initDB = async () => {
    try {
        const pool = getPool();

        console.log("Borrando tablas existentes...");

        await pool.query("DROP TABLE IF EXISTS users;");
        await pool.query("DROP TABLE IF EXISTS photo;");
        await pool.query("DROP TABLE IF EXISTS likes;");

        console.log("Creando tabla users...");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL,   
                email VARCHAR(100) NOT NULL,
                passwd VARCHAR(100) NOT NULL,    
                registrationcode VARCHAR(100)
            );
        `);

        console.log("Creando tabla photo...");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS photo(
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name_photo VARCHAR(100) NOT NULL,
                description_photo VARCHAR(300) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_id INT UNSIGNED,    	
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
                
            );
        `);

        console.log("Creando tabla likes...");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS likes(
                like_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                user_id INT UNSIGNED,    
                photo_id INT UNSIGNED,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                FOREIGN KEY (photo_id) REFERENCES photo (id) ON DELETE CASCADE    
            );
        `);

        console.log("Creando tabla comments...");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS comments(
                comments_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                comments VARCHAR(300) NOT NULL,
                user_id INT UNSIGNED,    
                photo_id INT UNSIGNED,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                FOREIGN KEY (photo_id) REFERENCES photo (id) ON DELETE CASCADE    
            );
        `);        

        console.log("Tablas creadas!")

    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
};

initDB();