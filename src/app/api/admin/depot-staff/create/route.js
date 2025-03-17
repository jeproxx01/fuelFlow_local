import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { username, email, password, depot_location } = await req.json();

    // Basic validation
    if (!username || !email || !password || !depot_location) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Start a transaction
    await db.transaction(async (connection) => {
      // Check if username or email already exists
      const [existingUsers] = await connection.execute(
        "SELECT id FROM users WHERE username = ? OR email = ?",
        [username, email]
      );

      if (existingUsers.length > 0) {
        throw new Error("Username or email already exists");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user account
      const [userResult] = await connection.execute(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, "depot_staff"]
      );

      const userId = userResult.insertId;

      // Create depot staff profile - using department instead of depot_location
      await connection.execute(
        "INSERT INTO depot_staff (user_id, department) VALUES (?, ?)",
        [userId, depot_location]
      );
    });

    return NextResponse.json(
      { message: "Depot staff account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating depot staff account:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create depot staff account" },
      { status: 500 }
    );
  }
}
