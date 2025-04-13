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
      console.log("No session found");
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

    const userId = session.user.id;

    // Get user profile and verify admin role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return NextResponse.json(
        { message: "Error fetching user profile" },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    if (profile.role !== "Greystar Manager (Admin)") {
      console.log("User is not an admin:", userId);
      return NextResponse.json(
        { message: "Unauthorized access" },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const response = NextResponse.json(
      {
        user: {
          id: userId,
          username: profile.full_name,
          email: session.user.email,
          role: profile.role,
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
