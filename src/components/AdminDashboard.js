// components/AdminDashboard.js
export function AdminDashboard() {
  return (
    <div className="p-6 mt-16 ml-64 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Row 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Total Customer</h2>
          <p className="text-2xl font-bold">1500</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">New Order</h2>
          <p className="text-2xl font-bold">50</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Total Admin</h2>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Confirmed Order</h2>
          <p className="text-2xl font-bold">45</p>
        </div>

        {/* Row 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
          <p className="text-2xl font-bold">300</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">On The Way Order</h2>
          <p className="text-2xl font-bold">10</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Order Delivered</h2>
          <p className="text-2xl font-bold">290</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
          <p className="text-2xl font-bold">₱20,000</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Top Sellers</h2>
          <img
            src="https://openui.fly.dev/openui/300x200.svg?text=📊"
            alt="Top Sellers Chart"
            className="w-full h-auto"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Top Sellers</h2>
          <img
            src="https://openui.fly.dev/openui/300x200.svg?text=📈"
            alt="Top Sellers Chart"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
