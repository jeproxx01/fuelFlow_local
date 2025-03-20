"use client";
import { useState } from "react";

export default function OfficeStaffOrders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      customer: "ABC Company",
      product: "Diesel",
      quantity: "5000L",
      status: "Completed",
      depot: "Main Depot",
      deliveryDate: "2024-03-17",
      assignedTo: "John Doe",
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      customer: "XYZ Industries",
      product: "Unleaded",
      quantity: "3000L",
      status: "Processing",
      depot: "North Depot",
      deliveryDate: "2024-03-18",
      assignedTo: "Jane Smith",
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      customer: "123 Services",
      product: "Premium",
      quantity: "2000L",
      status: "Pending",
      depot: "South Depot",
      deliveryDate: "2024-03-19",
      assignedTo: "Unassigned",
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            New Order
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Export Data
          </button>
        </div>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-500">All time</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-600">1</p>
          <p className="text-sm text-gray-500">Successfully delivered</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-500">Processing</h3>
          <p className="text-2xl font-bold text-yellow-600">1</p>
          <p className="text-sm text-gray-500">In progress</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-red-600">1</p>
          <p className="text-sm text-gray-500">Awaiting action</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Number
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Depot
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.depot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.deliveryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-sm rounded-full font-medium ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 mr-3">
                      View
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
