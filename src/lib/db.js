import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "fuelflow",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  namedPlaceholders: true,
});

// Helper function to get a connection with retry logic
const getConnectionWithRetry = async (retries = 3, delay = 500) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection();
      return connection;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Failed to get connection, retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// Test the connection with retry logic
getConnectionWithRetry()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

export const db = {
  execute: async (sql, params) => {
    let connection;
    try {
      connection = await getConnectionWithRetry();
      const [rows] = await connection.execute(sql, params);
      return [rows];
    } catch (error) {
      console.error("Database query error:", {
        sql,
        params,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    } finally {
      if (connection) connection.release();
    }
  },
  query: async (sql, params) => {
    let connection;
    try {
      connection = await getConnectionWithRetry();
      const [rows] = await connection.execute(sql, params);
      return [rows];
    } catch (error) {
      console.error("Database query error:", {
        sql,
        params,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    } finally {
      if (connection) connection.release();
    }
  },
  transaction: async (callback) => {
    let connection;
    try {
      connection = await getConnectionWithRetry();
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      if (connection) await connection.rollback();
      throw error;
    } finally {
      if (connection) connection.release();
    }
  },
};
