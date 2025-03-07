import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log("Login attempt for email:", email);

    // Validate required fields
    if (!email || !password) {
      console.log("Missing required fields");
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find admin by email
    console.log("Querying database for admin with email:", email);
    const [rows] = await db.execute(
      "SELECT id, username, email, password FROM admin WHERE email = ?",
      [email]
    );

    console.log("Database response rows:", rows);
    const admin = rows[0];

    if (!admin) {
      console.log("No admin found with email:", email);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log("Found admin:", {
      id: admin.id,
      email: admin.email,
      username: admin.username,
    });

    // Verify password
    console.log("Verifying password");
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      console.log("Invalid password for admin:", admin.email);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log("Password verified successfully");

    // Create JWT token with username
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        role: "admin",
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    console.log("JWT token created");

    // Create the response
    const response = new NextResponse(
      JSON.stringify({
        message: "Login successful",
        user: {
          id: admin.id,
          email: admin.email,
          username: admin.username,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
            60 * 60 * 24
          }`,
        },
      }
    );

    console.log("Response created with cookie");

    return response;
  } catch (error) {
    console.error("Login error:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
