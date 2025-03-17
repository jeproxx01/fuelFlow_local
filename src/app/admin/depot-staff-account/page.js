"use client";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { X } from "lucide-react";

export default function DepotStaffAccountPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    depot_location: "",
  });

  // Fetch staff list
  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await fetch("/api/admin/depot-staff");
      const data = await response.json();
      if (response.ok) {
        setStaffList(data.staff);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch staff list");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/depot-staff/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Depot staff account created successfully");
        setIsModalOpen(false);
        setFormData({
          username: "",
          email: "",
          password: "",
          depot_location: "",
        });
        fetchStaffList(); // Refresh the list
      } else {
        toast.error(data.message || "Failed to create account");
      }
    } catch (error) {
      toast.error("Failed to create account");
    }
  };

  return (
    <>
      <Toaster />
      <div className="p-6">
        <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Accounts - (Depot Staff)</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Add Depot Staff
          </button>
        </header>

        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <label htmlFor="entries" className="font-medium">
              Show
            </label>
            <select id="entries" className="border rounded p-1">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mt-4 border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-2">NAME</th>
                  <th className="border border-gray-200 p-2">USERNAME</th>
                  <th className="border border-gray-200 p-2">EMAIL</th>
                  <th className="border border-gray-200 p-2">AGE</th>
                  <th className="border border-gray-200 p-2">SEX</th>
                  <th className="border border-gray-200 p-2">CONTACT NO</th>
                  <th className="border border-gray-200 p-2">DEPOT LOCATION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4">
                      Loading...
                    </td>
                  </tr>
                ) : staffList.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4">
                      No depot staff accounts found
                    </td>
                  </tr>
                ) : (
                  staffList.map((staff) => (
                    <tr
                      key={staff.id}
                      className="text-center border border-gray-200"
                    >
                      <td className="p-2">{staff.full_name || "Not set"}</td>
                      <td className="p-2">{staff.username}</td>
                      <td className="p-2">{staff.email || "Not set"}</td>
                      <td className="p-2">{staff.age || "Not set"}</td>
                      <td className="p-2">{staff.sex || "Not set"}</td>
                      <td className="p-2">{staff.contact_no || "Not set"}</td>
                      <td className="p-2">{staff.depot_location}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Depot Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Create Depot Staff Account
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
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
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Depot Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.depot_location}
                  onChange={(e) =>
                    setFormData({ ...formData, depot_location: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
