import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    // Initialize Supabase client with auth helpers
    const supabase = createRouteHandlerClient({ cookies });

    // Get the current session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Get user profile and verify depot staff role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return NextResponse.json(
        { message: "Error fetching user profile" },
        { status: 500 }
      );
    }

    if (!profile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (profile.role !== "Depot Staff") {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    return NextResponse.json({
      user: {
        id: userId,
        username: profile.full_name,
        email: session.user.email,
        depot_location: profile.department,
        full_name: profile.full_name,
        age: profile.age,
        sex: profile.sex,
        contact_no: profile.contact_no,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
