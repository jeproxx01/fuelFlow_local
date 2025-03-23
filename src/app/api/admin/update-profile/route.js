import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req) {
  try {
    const { username, email, currentPassword, newPassword } = await req.json();
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify token and get user ID
    const decoded = jwt.verify(
      token.value,
      process.env.JWT_SECRET || "your-secret-key"
    );

    // Get current user data
    const [users] = await db.execute("SELECT * FROM users WHERE id = ?", [
      decoded.id,
    ]);

    if (users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = users[0];

    // If trying to change password, verify current password
    if (newPassword) {
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Current password is incorrect" },
          { status: 401 }
        );
      }
    }

    // Update user data
    const updates = [];
    const values = [];

    if (username && username !== user.username) {
      updates.push("username = ?");
      values.push(username);
    }

    if (email && email !== user.email) {
      updates.push("email = ?");
      values.push(email);
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updates.push("password = ?");
      values.push(hashedPassword);
    }

    if (updates.length > 0) {
      values.push(decoded.id);
      const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      await db.execute(query, values);
    }

    // Get updated user data
    const [updatedUsers] = await db.execute(
      "SELECT id, username, email, role FROM users WHERE id = ?",
      [decoded.id]
    );

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUsers[0],
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
