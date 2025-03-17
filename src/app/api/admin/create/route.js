import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import mysql from "mysql2/promise";

export async function POST(req) {
  // Create a new connection from the pool
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "fuelflow",
  });

  try {
    const body = await req.json();
    const { username, email, password } = body;

    console.log("Attempting to create admin account:", { username, email });

    // Basic validation
    if (!username || !email || !password) {
      await connection.end();
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists in users table
    const [existingUsers] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    console.log("Existing users check result:", existingUsers);

    if (existingUsers && existingUsers.length > 0) {
      await connection.end();
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Start transaction
      await connection.beginTransaction();
      console.log("Transaction started");

      // Create user first
      const [userResult] = await connection.execute(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, "admin"]
      );

      console.log("User created with ID:", userResult.insertId);

      if (!userResult || !userResult.insertId) {
        throw new Error("Failed to create user");
      }

      // Create admin entry
      const [adminResult] = await connection.execute(
        "INSERT INTO admin (user_id) VALUES (?)",
        [userResult.insertId]
      );

      console.log("Admin entry created:", adminResult);

      // Commit transaction
      await connection.commit();
      console.log("Transaction committed");

      await connection.end();
      return NextResponse.json(
        {
          message: "Admin account created successfully",
          user: {
            id: userResult.insertId,
            username,
            email,
          },
        },
        { status: 201 }
      );
    } catch (error) {
      // Rollback transaction on error
      console.error("Error during transaction:", error);
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error creating admin account:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });

    await connection.end();

    // Check for specific MySQL errors
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Error creating account" },
      { status: 500 }
    );
  }
}
