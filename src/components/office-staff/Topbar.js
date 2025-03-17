"use client";
import React, { useState, useEffect } from "react";
import { Bell, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export const Topbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [userData, setUserData] = useState({
    id: null,
    username: "Loading...",
    email: "",
    department: "Loading...",
    full_name: "",
    age: "",
    sex: "",
    contact_no: "",
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/office-staff/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/office-staff/login");
            return;
          }
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        if (!data.user) {
          throw new Error("Invalid data format received");
        }

        if (isMounted) {
          setUserData(data.user);
          setEditedData(data.user);
          setError(null);
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error);
        if (isMounted) {
          setError(error.message || "Failed to load user data");
          setUserData({
            username: "Error",
            department: "Error",
          });
        }
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("/api/office-staff/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.id,
          username: editedData.username,
          email: editedData.email,
          fullName: editedData.full_name,
          age: editedData.age,
          sex: editedData.sex,
          contactNo: editedData.contact_no,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully");
        setUserData({ ...userData, ...editedData });
        setIsProfileModalOpen(false);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/office-staff/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.id,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password updated successfully");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsPasswordModalOpen(false);
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-white shadow-sm">
        <div className="px-4 h-16 flex items-center justify-end">
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative transform -rotate-12 hover:rotate-0 transition-transform">
              <Bell
                size={24}
                className="text-gray-600 transform"
                style={{ transform: "scaleX(-1)" }}
              />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                2
              </span>
            </div>

            {/* User Profile */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setIsProfileModalOpen(true)}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium">
                  {userData.username}
                </span>
                <span className="text-gray-500 text-sm">
                  office staff - ({userData.department})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editedData.full_name || ""}
                  onChange={(e) =>
                    setEditedData({ ...editedData, full_name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={editedData.username || ""}
                  onChange={(e) =>
                    setEditedData({ ...editedData, username: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={editedData.email || ""}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  value={editedData.age || ""}
                  onChange={(e) =>
                    setEditedData({ ...editedData, age: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sex
                </label>
                <select
                  value={editedData.sex || ""}
                  onChange={(e) =>
                    setEditedData({ ...editedData, sex: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact No
                </label>
                <input
                  type="text"
                  value={editedData.contact_no || ""}
                  onChange={(e) =>
                    setEditedData({ ...editedData, contact_no: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  value={editedData.department || ""}
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-100"
                />
              </div>
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={handleUpdateProfile}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Update Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Update Password</h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
