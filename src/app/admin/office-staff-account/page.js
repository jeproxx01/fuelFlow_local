"use client";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { X } from "lucide-react";

export default function OfficeStaffAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    department: "",
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    online: 0,
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch("/api/admin/office-staff");
      const data = await response.json();

      if (response.ok) {
        setAccounts(data.staff);
        // Calculate stats
        const activeCount = data.staff.filter(
          (acc) => acc.status === "Active"
        ).length;
        setStats({
          total: data.staff.length,
          active: activeCount,
          inactive: data.staff.length - activeCount,
          online: data.staff.filter((acc) => acc.isOnline).length,
        });
      } else {
        toast.error(data.message || "Failed to fetch accounts");
      }
    } catch (error) {
      toast.error("Error fetching accounts");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (accountId, newStatus) => {
    try {
      const response = await fetch(
        `/api/admin/office-staff/${accountId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(`Account ${newStatus.toLowerCase()} successfully`);
        fetchAccounts(); // Refresh the list
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating account status");
    }
  };

  const handleResetPassword = async (accountId) => {
    try {
      const response = await fetch(
        `/api/admin/office-staff/${accountId}/reset-password`,
        {
          method: "POST",
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset link sent successfully");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.department
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/admin/office-staff/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Office staff account created successfully");
        setIsModalOpen(false);
        setFormData({
          username: "",
          email: "",
          password: "",
          department: "",
        });
        fetchAccounts(); // Refresh the list
      } else {
        toast.error(data.message || "Failed to create account");
      }
    } catch (error) {
      toast.error("Error creating account");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Office Staff Accounts</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Account
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Export Data
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Create Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Create Office Staff Account
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username*
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email*
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password*
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department*
                </label>
                <select
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Logistics">Logistics</option>
                </select>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Account Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Accounts</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-500">Office staff</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Active</h3>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          <p className="text-sm text-gray-500">Currently active</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-500">Inactive</h3>
          <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
          <p className="text-sm text-gray-500">Deactivated</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">Online Now</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.online}</p>
          <p className="text-sm text-gray-500">Currently logged in</p>
        </div>
      </div>

      {/* Accounts List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-4">Loading accounts...</div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-4">No accounts found</div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sex
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact No.
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {accounts.map((account) => (
                  <tr
                    key={account.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.full_name || "Not set"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.age || "Not set"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.sex || "Not set"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.contact_no || "Not set"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.department || "Not set"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-sm rounded-full font-medium ${
                          account.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {account.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.last_login || "Never"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(account.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        Edit
                      </button>
                      <button
                        onClick={() => handleResetPassword(account.id)}
                        className="text-gray-600 hover:text-gray-800 mr-3"
                      >
                        Reset Pass
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(
                            account.id,
                            account.status === "Active" ? "Inactive" : "Active"
                          )
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        {account.status === "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
