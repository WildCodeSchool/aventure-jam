import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

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
    title TEXT NOT NULL,
    description TEXT NOT NULL
  );
    
  CREATE TABLE IF NOT EXISTS inventory (
      id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      isUsed BOOLEAN NOT NULL,
      userId INT NOT NULL,
      objectId INT,
      historyId INT NOT NULL,
      FOREIGN KEY (objectId) REFERENCES object(id),
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (historyId) REFERENCES history(id)
  );

  CREATE TABLE IF NOT EXISTS steps (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    text TEXT NOT NULL,
    historyId INT NOT NULL,
    pnj VARCHAR(255),
    background TEXT NOT NULL,
    FOREIGN KEY (historyId) REFERENCES history(id)
  );

  CREATE TABLE IF NOT EXISTS choice (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    text TEXT NOT NULL,
    stepId INT NOT NULL,
    objectId INT,
    linkToStepId INT NOT NULL,
    FOREIGN KEY (objectId) REFERENCES object(id),
    FOREIGN KEY (stepId) REFERENCES steps(id)
    );

  CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    historyId INT NOT NULL,
    stepId INT NOT NULL,
    objectId INT,
    userId INT NOT NULL,
    FOREIGN KEY (historyId) REFERENCES history(id),
    FOREIGN KEY (stepId) REFERENCES steps(id),
    FOREIGN KEY (objectId) REFERENCES object(id),
    FOREIGN KEY (userId) REFERENCES users(id)
  );


`;

const migrate = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      multipleStatements: true,
    });

    await connection.query(schema);
    await connection.end();

    console.log("✅ Database seed upload successfully");
  } catch (err) {
    console.error("❌ Error during migration:", err);
  }
};

migrate();
