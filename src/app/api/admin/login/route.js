import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Initialize Supabase client with auth helpers
    const supabase = createRouteHandlerClient({ cookies });

    // Sign in with password (using username as email)
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: username, // Using username as email since Supabase uses email-based auth
        password,
      });

    if (authError) {
      console.error("Auth error:", authError);
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const userId = authData.user.id;

    // Verify admin role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return NextResponse.json(
        { message: "Error verifying user role" },
        { status: 500 }
      );
    }

    if (profile.role !== "Greystar Manager (Admin)") {
      // Sign out the user if they're not an admin
      await supabase.auth.signOut();
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: userId,
        username: profile.full_name,
        email: authData.user.email,
        role: profile.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
