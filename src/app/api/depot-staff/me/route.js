import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

export async function GET(req) {
  try {
    // Get the token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    if (decoded.role !== "depot_staff") {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    // Get user data from database
    const [users] = await db.execute(
      `SELECT u.id, u.username, u.email, ds.department as depot_location, ds.full_name, ds.age, ds.sex, ds.contact_no 
       FROM users u 
       INNER JOIN depot_staff ds ON u.id = ds.user_id 
       WHERE u.id = ? AND u.role = 'depot_staff'`,
      [decoded.id]
    );

    const user = users[0];

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        depot_location: user.depot_location,
        full_name: user.full_name,
        age: user.age,
        sex: user.sex,
        contact_no: user.contact_no,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
