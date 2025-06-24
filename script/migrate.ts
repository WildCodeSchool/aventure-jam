import "dotenv/config"
import mysql from "mysql2/promise"

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env

const schema = `
  CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  USE \`${MYSQL_DB_NAME}\`;

  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    pseudo VARCHAR(100) NOT NULL,
    avatar VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS object (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(100) NOT NULL
  );

   CREATE TABLE IF NOT EXISTS history (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    texte TEXT NOT NULL,
    description TEXT NOT NULL
  );
    
  CREATE TABLE IF NOT EXISTS inventory (
      id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      is_used BOOLEAN NOT NULL,
      user_id INT NOT NULL,
      object_id INT NOT NULL,
      history_id INT NOT NULL,
      FOREIGN KEY (object_id) REFERENCES object(id),
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (history_id) REFERENCES history(id)
  );

  CREATE TABLE IF NOT EXISTS etape (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    texte TEXT NOT NULL,
    history_id INT NOT NULL,
    pnj TEXT NOT NULL,
    background TEXT NOT NULL,
    FOREIGN KEY (history_id) REFERENCES history(id)
  );

  CREATE TABLE IF NOT EXISTS choice (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    texte TEXT NOT NULL,
    etape_id INT NOT NULL,
    object_id INT NOT NULL,
    FOREIGN KEY (object_id) REFERENCES object(id),
    FOREIGN KEY (etape_id) REFERENCES etape(id)
  );

  CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    history_id INT NOT NULL,
    etape_id INT NOT NULL,
    object_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (history_id) REFERENCES history(id),
    FOREIGN KEY (etape_id) REFERENCES etape(id),
    FOREIGN KEY (object_id) REFERENCES object(id)
  );

  CREATE TABLE IF NOT EXISTS etape_object (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    etape_id INT NOT NULL,
    object_id INT NOT NULL,
    FOREIGN KEY (object_id) REFERENCES object(id),
    FOREIGN KEY (etape_id) REFERENCES etape(id)
  );
`

const migrate = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      multipleStatements: true,
    })

    await connection.query(schema)
    await connection.end()

    console.log("✅ Database schema created successfully")
  } catch (err) {
    console.error("❌ Error during migration:", err)
  }
}

migrate()
