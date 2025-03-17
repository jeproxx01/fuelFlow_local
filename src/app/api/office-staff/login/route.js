import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    console.log("Login attempt for username:", username);

    // Validate required fields
    if (!username || !password) {
      console.log("Missing required fields");
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Get user with role office_staff
    const [users] = await db.execute(
      `SELECT u.*, os.id as staff_id, os.department 
       FROM users u 
       INNER JOIN office_staff os ON u.id = os.user_id 
       WHERE u.username = ? AND u.role = 'office_staff'`,
      [username]
    );

    console.log("Database query result:", { userCount: users.length });

    const user = users[0];

    if (!user) {
      console.log("No user found with username:", username);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password for user:", username);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        staff_id: user.staff_id,
        username: user.username,
        role: "office_staff",
        department: user.department,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    console.log("JWT token created for user:", username);

    // Create the response
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          staff_id: user.staff_id,
          username: user.username,
          department: user.department,
        },
      },
      { status: 200 }
    );

    // Set the cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    console.log("Login successful for user:", username);
    return response;
  } catch (error) {
    console.error("Login error:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });

    // Check for specific database errors
    if (error.code === "ER_NO_SUCH_TABLE") {
      return NextResponse.json(
        { message: "Database setup error: Tables not found" },
        { status: 500 }
      );
    }

    if (error.code === "ECONNREFUSED") {
      return NextResponse.json(
        { message: "Database connection error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
