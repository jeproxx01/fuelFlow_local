import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

export async function GET(req) {
  try {
    // Get token from cookies
    const token = cookies().get("token")?.value;

    if (!token) {
      console.log("No token found in cookies");
      return NextResponse.json(
        { message: "Not authenticated" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    if (!decoded || !decoded.id) {
      console.log("Invalid token payload:", decoded);
      return NextResponse.json(
        { message: "Invalid token" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Get fresh user data from database
    const [rows] = await db.execute(
      "SELECT id, username, email FROM admin WHERE id = ?",
      [decoded.id]
    );

    if (!rows || rows.length === 0) {
      console.log("No admin found with id:", decoded.id);
      return NextResponse.json(
        { message: "Admin not found" },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const admin = rows[0];

    const response = NextResponse.json(
      {
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
        },
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error in /me route:", error);

    if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { message: "Invalid token" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
