import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Initialize Supabase admin client for user deletion
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

export async function DELETE(req) {
  try {
    // Get the URL from the request
    const url = new URL(req.url);
    // Extract the userId from the query parameters
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Initialize user's Supabase client
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { message: "Unauthorized: Not authenticated" },
        { status: 401 }
      );
    }

    // Verify requester's role
    const { data: requesterProfile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      throw profileError;
    }

    // Check if requester is admin or office staff
    if (
      requesterProfile.role !== "Greystar Manager (Admin)" &&
      requesterProfile.role !== "Office Staff"
    ) {
      return NextResponse.json(
        { message: "Forbidden: Insufficient permissions" },
        { status: 403 }
      );
    }

    // Verify target user exists and is depot staff
    const { data: targetProfile, error: targetError } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (targetError || !targetProfile) {
      return NextResponse.json(
        { message: "Depot staff not found" },
        { status: 404 }
      );
    }

    if (targetProfile.role !== "Depot Staff") {
      return NextResponse.json(
        { message: "Target user is not a depot staff member" },
        { status: 400 }
      );
    }

    // Delete user from Supabase Auth
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      userId
    );

    if (deleteError) {
      throw deleteError;
    }

    // The profile will be automatically deleted due to ON DELETE CASCADE

    return NextResponse.json(
      { message: "Depot staff account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting depot staff account:", error);
    return NextResponse.json(
      { message: error.message || "Error deleting depot staff account" },
      { status: 500 }
    );
  }
}
