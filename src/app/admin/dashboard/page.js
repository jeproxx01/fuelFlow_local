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
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch auth check
        const authResponse = await fetch("/api/admin/me", {
          credentials: "include",
        });

        if (!authResponse.ok) {
          if (authResponse.status === 401) {
            router.push("/admin/login");
            return;
          }
          throw new Error("Failed to fetch admin data");
        }

        // Fetch user statistics
        const statsResponse = await fetch("/api/admin/users/stats", {
          credentials: "include",
        });

        if (!statsResponse.ok) {
          throw new Error("Failed to fetch user statistics");
        }

        const statsData = await statsResponse.json();
        setUserStats(statsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
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
      title: "Total User",
      value: userStats?.totalUsers || "0",
    },
    {
      title: "Confirmed Order",
      value: "45",
    },
  ];

  // Bar chart data
  const barChartData = {
    labels: ["Diesel", "Gasoline", "Premium"],
    datasets: [
      {
        label: "Sales Volume",
        data: [65, 45, 75],
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
        data: [30, 45, 35, 50, 40, 60],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Calculate percentages for the pie chart
  const calculatePercentage = (count, total) => {
    return ((count / total) * 100).toFixed(1);
  };

  // Pie chart data for user roles
  const pieChartData = {
    labels:
      userStats?.roleDistribution?.map((stat) => {
        const percentage = calculatePercentage(
          stat.count,
          userStats.totalUsers
        );
        return `${stat.role} (${percentage}%)`;
      }) || [],
    datasets: [
      {
        data: userStats?.roleDistribution?.map((stat) => stat.count) || [],
        backgroundColor: [
          "#3B82F6", // Blue for admin
          "#10B981", // Green for office staff
          "#EC4899", // Pink for depot staff
          "#F59E0B", // Yellow for others
        ],
        borderWidth: 1,
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

  // Pie chart options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = calculatePercentage(value, total);
            return `Count: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* User Roles Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            User Role Distribution
          </h3>
          <div className="h-48 md:h-64">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>

        {/* Top Sellers Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Sellers
          </h3>
          <div className="h-48 md:h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* Sales Trend Line Chart */}
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
