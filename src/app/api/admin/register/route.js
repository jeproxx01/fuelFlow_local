import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    console.log("Registration attempt for:", { username, email });

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const [existingUsers] = await db.execute(
      "SELECT id FROM admin WHERE email = ?",
      [email]
    );

    console.log("Existing users check:", existingUsers);

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const [result] = await db.execute(
      "INSERT INTO admin (username, email, password, created_at) VALUES (?, ?, ?, NOW())",
      [username, email, hashedPassword]
    );

    console.log("Insert result:", result);

    if (!result || !result.insertId) {
      throw new Error("Failed to create admin account");
    }

    return NextResponse.json(
      {
        message: "Admin account created successfully",
        user: {
          id: result.insertId,
          username,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    // Check for specific MySQL errors
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
