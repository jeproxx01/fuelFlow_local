import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Initialize Supabase admin client for querying all users
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

// Known user roles in the system
const USER_ROLES = ["Greystar Manager (Admin)", "Depot Staff", "Office Staff"];

export async function GET(req) {
  try {
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
        { message: "Admin access required" },
        { status: 403 }
      );
    }

    // Get total users count
    const { count: totalUsers, error: countError } = await supabaseAdmin
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (countError) {
      throw countError;
    }

    // Get counts for each role
    const roleDistribution = await Promise.all(
      USER_ROLES.map(async (role) => {
        const { count, error: roleError } = await supabaseAdmin
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("role", role);

        if (roleError) {
          console.error(`Error fetching count for role ${role}:`, roleError);
          return { role, count: 0 };
        }

        return { role, count: count || 0 };
      })
    );

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      roleDistribution,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { message: "Error fetching user statistics" },
      { status: 500 }
    );
  }
}
