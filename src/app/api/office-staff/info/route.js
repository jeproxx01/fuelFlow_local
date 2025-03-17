import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    // Get user info without password
    const [users] = await db.execute(
      `SELECT u.username, os.department 
       FROM users u 
       INNER JOIN office_staff os ON u.id = os.user_id 
       WHERE u.username = ? AND u.role = 'office_staff'`,
      [username]
    );

    if (!users || users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        username: users[0].username,
        role: "office staff",
        department: users[0].department,
      },
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
