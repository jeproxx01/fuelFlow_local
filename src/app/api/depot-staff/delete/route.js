import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function DELETE(req) {
  try {
    // Get the URL from the request
    const url = new URL(req.url);
    // Extract the userId from the query parameters
    const userId = url.searchParams.get("userId");

    // Verify admin authorization
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user has admin or office_staff role
    if (decoded.role !== "admin" && decoded.role !== "office_staff") {
      return NextResponse.json(
        { message: "Forbidden: Insufficient permissions" },
        { status: 403 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Start a transaction to ensure data consistency
    await db.transaction(async (connection) => {
      // First check if the user exists and is a depot staff
      const [depotStaff] = await connection.execute(
        "SELECT * FROM depot_staff WHERE user_id = ?",
        [userId]
      );

      if (depotStaff.length === 0) {
        throw new Error("Depot staff not found");
      }

      // Delete from depot_staff table first (child record)
      await connection.execute("DELETE FROM depot_staff WHERE user_id = ?", [
        userId,
      ]);

      // Then delete from users table (parent record)
      await connection.execute("DELETE FROM users WHERE id = ?", [userId]);
    });

    return NextResponse.json(
      { message: "Depot staff account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting depot staff account:", error);
    return NextResponse.json(
      { message: error.message || "Error deleting depot staff account" },
      { status: 500 }
    );
  }
}
