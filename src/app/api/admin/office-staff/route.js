import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // First check if the table exists
    const [tables] = await db.execute("SHOW TABLES LIKE 'office_staff'");

    if (tables.length === 0) {
      console.error("office_staff table does not exist");
      return NextResponse.json(
        { message: "Database not properly set up" },
        { status: 500 }
      );
    }

    const [rows] = await db.execute(
      `SELECT 
        u.id,
        u.username,
        u.email,
        os.full_name,
        os.age,
        os.sex,
        os.contact_no,
        os.department
       FROM users u
       INNER JOIN office_staff os ON u.id = os.user_id
       WHERE u.role = 'office_staff'
       ORDER BY os.id DESC`
    );

    return NextResponse.json(
      {
        staff: rows,
        count: rows.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching office staff:", {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      { message: error.message || "Error fetching office staff" },
      { status: 500 }
    );
  }
}
