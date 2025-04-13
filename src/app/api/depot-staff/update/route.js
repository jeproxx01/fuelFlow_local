import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Initialize Supabase admin client for admin operations
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
    const {
      userId,
      username,
      email,
      fullName,
      age,
      sex,
      contactNo,
      newPassword,
    } = await req.json();

    // Basic validation
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
      data: { user: requester },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !requester) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify requester's role
    const { data: requesterProfile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", requester.id)
      .single();

    if (profileError) {
      throw profileError;
    }

    // Check if requester is admin/office staff or the user themselves
    const isSelf = requester.id === userId;
    const isAdmin = requesterProfile.role === "Greystar Manager (Admin)";
    const isOfficeStaff = requesterProfile.role === "Office Staff";

    if (!isSelf && !isAdmin && !isOfficeStaff) {
      return NextResponse.json(
        { message: "Unauthorized to update this profile" },
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

    // Prepare updates
    const profileUpdates = {};
    const authUpdates = {};

    if (fullName || username) {
      profileUpdates.full_name = fullName || username;
    }

    if (age) {
      profileUpdates.age = age;
    }

    if (sex) {
      profileUpdates.sex = sex;
    }

    if (contactNo) {
      profileUpdates.contact_no = contactNo;
    }

    if (email && email !== requester.email) {
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
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update(profileUpdates)
        .eq("id", userId);

      if (updateError) {
        throw updateError;
      }
    }

    // Update auth user if needed
    if (Object.keys(authUpdates).length > 0) {
      const { error: authUpdateError } =
        await supabaseAdmin.auth.admin.updateUserById(userId, authUpdates);

      if (authUpdateError) {
        throw authUpdateError;
      }
    }

    // Get updated user data
    const { data: updatedProfile } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    const { data: updatedAuthUser } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: userId,
        username: updatedProfile.full_name,
        email: updatedAuthUser.user.email,
        full_name: updatedProfile.full_name,
        age: updatedProfile.age,
        sex: updatedProfile.sex,
        contact_no: updatedProfile.contact_no,
        department: updatedProfile.department,
      },
    });
  } catch (error) {
    console.error("Error updating depot staff profile:", error);
    return NextResponse.json(
      { message: error.message || "Error updating profile" },
      { status: 500 }
    );
  }
}
