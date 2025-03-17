"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/depot-staff/me", {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/depot-staff/login");
            return;
          }
          throw new Error("Failed to fetch depot staff data");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const stats = [
    {
      title: "Total Gas Station",
      value: "1500",
    },
    {
      title: "New Order",
      value: "50",
    },
    {
      title: "Total Admin",
      value: "5",
    },
    {
      title: "Confirmed Order",
      value: "45",
    },
  ];

  // Bar chart data
  const barChartData = {
    labels: ["Regular", "Premium", "Diesel"],
    datasets: [
      {
        label: "Fuel Distribution",
        data: [600, 400, 500],
        backgroundColor: ["#10B981", "#EC4899", "#3B82F6"],
        borderRadius: 8,
      },
    ],
  };

  // Line chart data
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales Trend",
        data: [300, 450, 400, 550, 500, 600],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6 overflow-x-hidden">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              {stat.title}
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Fuel Distribution Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Fuel Distribution
          </h3>
          <div className="h-48 md:h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* Sales Trend Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Sales Trend
          </h3>
          <div className="h-48 md:h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
