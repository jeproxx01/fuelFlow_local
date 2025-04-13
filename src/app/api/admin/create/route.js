import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    console.log("Attempting to create admin account:", { username, email });

    // Basic validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } =
        await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            username,
          },
        });

      if (authError) {
        console.error("Auth creation error:", authError);
        if (authError.message.includes("already registered")) {
          return NextResponse.json(
            { message: "Email already registered" },
            { status: 409 }
          );
        }
        throw authError;
      }

      const userId = authData.user.id;

      // Create profile in public.profiles table
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .insert({
          id: userId,
          full_name: username,
          role: "Greystar Manager (Admin)",
          is_active: true,
        });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        // Rollback: Delete the auth user if profile creation fails
        await supabaseAdmin.auth.admin.deleteUser(userId);
        throw profileError;
      }

      return NextResponse.json(
        {
          message: "Admin account created successfully",
          user: {
            id: userId,
            username,
            email,
            role: "Greystar Manager (Admin)",
          },
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error during admin creation:", {
        message: error.message,
        stack: error.stack,
      });

      return NextResponse.json(
        { message: error.message || "Error creating account" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
