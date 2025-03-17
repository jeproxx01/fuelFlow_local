import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password, department, email } = body;

    // Basic validation
    if (!username || !password || !department || !email) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if username or email already exists
    const [existingUsers] = await db.execute(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUsers.length > 0) {
      const existingUser = existingUsers[0];
      if (existingUser.username === username) {
        return NextResponse.json(
          { message: "Username already taken" },
          { status: 409 }
        );
      }
      if (existingUser.email === email) {
        return NextResponse.json(
          { message: "Email already registered" },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use transaction helper
    await db.transaction(async (connection) => {
      // Create user first
      const [userResult] = await connection.execute(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, "office_staff"]
      );

      const userId = userResult.insertId;

      // Create office staff entry
      await connection.execute(
        "INSERT INTO office_staff (user_id, department) VALUES (?, ?)",
        [userId, department]
      );
    });

    return NextResponse.json(
      { message: "Office staff account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating office staff account:", error);
    return NextResponse.json(
      { message: error.message || "Error creating account" },
      { status: 500 }
    );
  }
}
