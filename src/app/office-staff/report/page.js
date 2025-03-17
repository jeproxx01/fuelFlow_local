"use client";

export default function Reports() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: "Sales Report",
            description: "View monthly sales data.",
          },
          {
            title: "Inventory Report",
            description: "Track stock levels and usage.",
          },
          {
            title: "Customer Feedback",
            description: "Analyze customer reviews.",
          },
        ].map((report, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <h2 className="text-lg font-semibold mb-2">{report.title}</h2>
            <p className="text-gray-600 mb-4">{report.description}</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              View Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
