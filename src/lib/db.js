import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "fuelflow",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

export const db = {
  execute: async (sql, params) => {
    try {
      const [rows] = await pool.execute(sql, params);
      return [rows];
    } catch (error) {
      console.error("Database query error:", {
        sql,
        params,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  },
  query: async (sql, params) => {
    try {
      const [rows] = await pool.execute(sql, params);
      return [rows];
    } catch (error) {
      console.error("Database query error:", {
        sql,
        params,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  },
};
