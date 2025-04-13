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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const userId = searchParams.get("userId");

    if (!username && !userId) {
      return NextResponse.json(
        { message: "Either username or userId is required" },
        { status: 400 }
      );
    }

    let profile;
    let authUser;

    if (userId) {
      // If userId is provided, fetch directly by ID
      const { data: profileData, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .eq("role", "Depot Staff")
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        return NextResponse.json(
          { message: "Error fetching user info" },
          { status: 500 }
        );
      }

      profile = profileData;

      if (profile) {
        const { data: userData, error: authError } =
          await supabaseAdmin.auth.admin.getUserById(userId);
        if (!authError) {
          authUser = userData.user;
        }
      }
    } else {
      // If username is provided, search by full_name
      const { data: profileData, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("full_name", username)
        .eq("role", "Depot Staff")
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        return NextResponse.json(
          { message: "Error fetching user info" },
          { status: 500 }
        );
      }

      profile = profileData;

      if (profile) {
        const { data: userData, error: authError } =
          await supabaseAdmin.auth.admin.getUserById(profile.id);
        if (!authError) {
          authUser = userData.user;
        }
      }
    }

    if (!profile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: profile.id,
        username: profile.full_name,
        email: authUser?.email,
        role: profile.role,
        department: profile.department,
      },
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(
      { message: "Error fetching user info" },
      { status: 500 }
    );
  }
}
