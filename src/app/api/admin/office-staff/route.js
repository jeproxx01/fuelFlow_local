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

export async function GET() {
  try {
    // Query profiles table for office staff
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("role", "Office Staff")
      .order("id", { ascending: false });

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      throw profilesError;
    }

    // Fetch emails for all staff members
    const staffWithEmails = await Promise.all(
      profiles.map(async (profile) => {
        const { data: authUser, error: authError } =
          await supabaseAdmin.auth.admin.getUserById(profile.id);

        if (authError) {
          console.error(
            `Error fetching auth data for user ${profile.id}:`,
            authError
          );
          return {
            ...profile,
            email: null,
            username: profile.full_name,
          };
        }

        return {
          id: profile.id,
          username: profile.full_name,
          email: authUser.user.email,
          full_name: profile.full_name,
          age: profile.age,
          sex: profile.sex,
          contact_no: profile.contact_no,
          department: profile.department,
        };
      })
    );

    return NextResponse.json(
      {
        staff: staffWithEmails,
        count: staffWithEmails.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching office staff:", {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      { message: error.message || "Error fetching office staff" },
      { status: 500 }
    );
  }
}
