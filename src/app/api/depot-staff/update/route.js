import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function PUT(req) {
  try {
    const {
      userId,
      username,
      email,
      fullName,
      age,
      sex,
      contactNo,
      currentPassword,
      newPassword,
    } = await req.json();

    // Basic validation
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Start a transaction
    await db.transaction(async (connection) => {
      // If password change is requested, verify current password first
      if (currentPassword && newPassword) {
        const [users] = await connection.execute(
          "SELECT password FROM users WHERE id = ?",
          [userId]
        );

        if (users.length === 0) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          currentPassword,
          users[0].password
        );

        if (!isPasswordValid) {
          throw new Error("Current password is incorrect");
        }

        // Hash and update new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await connection.execute("UPDATE users SET password = ? WHERE id = ?", [
          hashedPassword,
          userId,
        ]);
      }

      // Update user details if provided
      if (username || email) {
        // Check for existing username/email
        const [existingUsers] = await connection.execute(
          "SELECT id, username, email FROM users WHERE (username = ? OR email = ?) AND id != ?",
          [username || "", email || "", userId]
        );

        if (existingUsers.length > 0) {
          const existing = existingUsers[0];
          if (username && existing.username === username) {
            throw new Error("Username already taken");
          }
          if (email && existing.email === email) {
            throw new Error("Email already registered");
          }
        }

        const updates = [];
        const values = [];
        if (username) {
          updates.push("username = ?");
          values.push(username);
        }
        if (email) {
          updates.push("email = ?");
          values.push(email);
        }

        if (updates.length > 0) {
          await connection.execute(
            `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
            [...values, userId]
          );
        }
      }

      // Update depot staff details if provided
      if (fullName || age || sex || contactNo) {
        const updates = [];
        const values = [];
        if (fullName) {
          updates.push("full_name = ?");
          values.push(fullName);
        }
        if (age) {
          updates.push("age = ?");
          values.push(age);
        }
        if (sex) {
          updates.push("sex = ?");
          values.push(sex);
        }
        if (contactNo) {
          updates.push("contact_no = ?");
          values.push(contactNo);
        }

        if (updates.length > 0) {
          await connection.execute(
            `UPDATE depot_staff SET ${updates.join(", ")} WHERE user_id = ?`,
            [...values, userId]
          );
        }
      }
    });

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating depot staff profile:", error);
    return NextResponse.json(
      { message: error.message || "Error updating profile" },
      { status: 500 }
    );
  }
}
