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

    // Initialize Supabase client
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // First attempt to sign in with the provided credentials
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

    console.log("Sign in response:", JSON.stringify(signInData, null, 2));
    console.log("Sign in error:", signInError);

    if (signInError) {
      console.error("Sign in error:", signInError);
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    if (!signInData.session) {
      console.log("No session found in signInData");
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }

    const userId = signInData.session.user.id;
    console.log("Session user ID:", userId);
    console.log("Session user email:", signInData.session.user.email);

    // Get user profile using the ID from auth
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    // If profile doesn't exist, create one
    if (profileError && profileError.code === "PGRST116") {
      console.log("Creating new profile for user:", userId);
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            full_name: signInData.session.user.email.split("@")[0],
            role: "admin",
            is_active: true,
            registration_status: "Approved",
          },
        ])
        .select()
        .single();

      if (createError) {
        console.error("Profile creation error:", createError);
        return NextResponse.json(
          { message: "Error creating user profile" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Login successful",
        user: {
          id: userId,
          username: newProfile.full_name,
          email: signInData.session.user.email,
          role: newProfile.role,
        },
      });
    }

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return NextResponse.json(
        { message: "Error fetching user profile" },
        { status: 500 }
      );
    }

    if (!profile) {
      return NextResponse.json(
        { message: "User profile not found" },
        { status: 404 }
      );
    }

    // Return user data
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: userId,
        username: profile.full_name,
        email: signInData.session.user.email,
        role: profile.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
