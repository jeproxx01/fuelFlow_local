import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Initialize Supabase admin client for email uniqueness check
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

export async function PUT(req) {
  try {
    const { username, email, newPassword } = await req.json();

    // Initialize user's Supabase client
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify admin role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || profile.role !== "Greystar Manager (Admin)") {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Prepare updates
    const profileUpdates = {};
    const authUpdates = {};

    if (username) {
      profileUpdates.full_name = username;
    }

    if (email && email !== user.email) {
      // Check if email is already taken
      const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers({
        email,
      });

      if (existingUser && existingUser.length > 0) {
        return NextResponse.json(
          { message: "Email already registered" },
          { status: 409 }
        );
      }
      authUpdates.email = email;
    }

    if (newPassword) {
      authUpdates.password = newPassword;
    }

    // Update profile if needed
    if (Object.keys(profileUpdates).length > 0) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update(profileUpdates)
        .eq("id", user.id);

      if (updateError) {
        console.error("Profile update error:", updateError);
        throw updateError;
      }
    }

    // Update auth user if needed
    if (Object.keys(authUpdates).length > 0) {
      const { error: authUpdateError } = await supabase.auth.updateUser(
        authUpdates
      );

      if (authUpdateError) {
        console.error("Auth update error:", authUpdateError);
        throw authUpdateError;
      }
    }

    // Get updated user data
    const { data: updatedProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const {
      data: { user: updatedAuthUser },
    } = await supabase.auth.getUser();

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        username: updatedProfile.full_name,
        email: updatedAuthUser.email,
        role: updatedProfile.role,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
