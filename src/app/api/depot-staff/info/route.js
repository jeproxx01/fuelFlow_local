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

    const [users] = await db.execute(
      `SELECT u.id, u.username, u.role, ds.department 
       FROM users u 
       LEFT JOIN depot_staff ds ON u.id = ds.user_id 
       WHERE u.username = ? AND u.role = 'depot_staff'`,
      [username]
    );

    if (users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: users[0] });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(
      { message: "Error fetching user info" },
      { status: 500 }
    );
  }
}
