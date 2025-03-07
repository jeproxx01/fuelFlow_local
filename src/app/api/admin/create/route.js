import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // Basic validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await db.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin account
    await db.query(
      "INSERT INTO admin (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating admin account:", error);
    return NextResponse.json(
      { message: "Error creating account" },
      { status: 500 }
    );
  }
}
