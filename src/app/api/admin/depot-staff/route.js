import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [staff] = await db.execute(
      `SELECT 
        u.id,
        u.username,
        u.email,
        ds.department as depot_location,
        ds.full_name,
        ds.age,
        ds.sex,
        ds.contact_no
       FROM users u 
       INNER JOIN depot_staff ds ON u.id = ds.user_id 
       WHERE u.role = 'depot_staff'`
    );

    return NextResponse.json({ staff });
  } catch (error) {
    console.error("Error fetching depot staff:", error);
    return NextResponse.json(
      { message: "Failed to fetch depot staff" },
      { status: 500 }
    );
  }
}
