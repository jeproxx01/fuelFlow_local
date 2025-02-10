"use client";
import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default function ManageOrders() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Louie",
      product: "Diesel",
      quantity: "100L",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Jeff",
      product: "Unleaded",
      quantity: "50L",
      status: "Completed",
    },
    {
      id: 3,
      customer: "AR",
      product: "Premium",
      quantity: "75L",
      status: "Processing",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Topbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="p-6 mt-16">
          <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

          {/* Orders List */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Customer</th>
                  <th className="border p-2">Product</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="text-center">
                    <td className="border p-2">{order.customer}</td>
                    <td className="border p-2">{order.product}</td>
                    <td className="border p-2">{order.quantity}</td>
                    <td className="border p-2">{order.status}</td>
                    <td className="border p-2">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="border rounded p-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
