import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const { username, email, password, gasStationName, address } =
      await request.json();

    // Validate required fields
    if (!username || !email || !password || !gasStationName || !address) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Start a transaction
    await db.transaction(async (connection) => {
      // Check if username already exists
      const [existingUsername] = await connection.execute(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      if (existingUsername.length > 0) {
        throw new Error("Username already exists");
      }

      // Check if email already exists
      const [existingEmail] = await connection.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (existingEmail.length > 0) {
        throw new Error("Email already exists");
      }

      // Hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // Insert new user
      const [userResult] = await connection.execute(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, "gas_station_owner"]
      );

      const userId = userResult.insertId;

      // Insert gas station owner details
      await connection.execute(
        "INSERT INTO gas_station_owner (user_id, station_name, location) VALUES (?, ?, ?)",
        [userId, gasStationName, address]
      );
    });

    return NextResponse.json(
      { message: "Gas station owner account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating gas station owner account:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
