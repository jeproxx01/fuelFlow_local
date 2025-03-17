import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Get user from database
    const [users] = await db.execute("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (users.length === 0) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    // Set cookie
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 1 day
      path: "/",
    });

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
