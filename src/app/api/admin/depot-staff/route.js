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
    // Query profiles table for depot staff
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("role", "Depot Staff")
      .order("full_name", { ascending: true });

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
          depot_location: profile.department,
          full_name: profile.full_name,
          age: profile.age,
          sex: profile.sex,
          contact_no: profile.contact_no,
        };
      })
    );

    return NextResponse.json({ staff: staffWithEmails });
  } catch (error) {
    console.error("Error fetching depot staff:", error);
    return NextResponse.json(
      { message: "Failed to fetch depot staff" },
      { status: 500 }
    );
  }
}
