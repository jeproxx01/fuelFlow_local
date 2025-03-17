import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    // Get token from cookies
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    if (decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 }
      );
    }

    // Get user statistics
    const [userStats] = await db.execute(
      `SELECT role, COUNT(*) as count 
       FROM users 
       GROUP BY role`
    );

    // Calculate total users
    const totalUsers = userStats.reduce((sum, stat) => sum + stat.count, 0);

    return NextResponse.json({
      totalUsers,
      roleDistribution: userStats,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { message: "Error fetching user statistics" },
      { status: 500 }
    );
  }
}
