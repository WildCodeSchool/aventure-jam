import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
});

export const getEtapeById = async (historyId: number, etapeId: number) => {
  const [rows] = await db.execute(
    `SELECT * FROM etape WHERE id = ? AND history_id = ?`,
    [etapeId, historyId]
  );
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0];
  }

  return null;
};
