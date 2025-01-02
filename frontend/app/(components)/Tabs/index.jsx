import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Tabs = ({ orders }) => {
  const [activeTab, setActiveTab] = useState("day");

  // Proses data dari API orders untuk setiap tab
  const chartData = useMemo(() => {
    if (!orders || orders.length === 0) return { day: [], month: [], year: [] };

    // Konversi `usage_date` menjadi objek Date untuk diproses
    const parsedOrders = orders.map((order) => {
      const usageDate = new Date(order.usage_date);
      return {
        ...order,
        day: usageDate.toLocaleDateString("en-US", { weekday: "short" }), // Contoh: "Mon", "Tue"
        month: usageDate.toLocaleDateString("en-US", { month: "short" }), // Contoh: "Jan", "Feb"
        year: usageDate.getFullYear(), // Contoh: 2025
      };
    });

    // Data tab "day" - jumlah order berdasarkan hari
    const dayData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
      (day) => ({
        name: day,
        value: parsedOrders.filter((order) => order.day === day).length,
      })
    );

    // Data tab "month" - jumlah order berdasarkan bulan
    const monthData = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].map((month) => ({
      name: month,
      value: parsedOrders.filter((order) => order.month === month).length,
    }));

    // Data tab "year" - jumlah order berdasarkan tahun
    const years = [...new Set(parsedOrders.map((order) => order.year))]; // Ambil tahun unik
    const yearData = years.map((year) => ({
      name: year.toString(),
      value: parsedOrders.filter((order) => order.year === year).length,
    }));

    return { day: dayData, month: monthData, year: yearData };
  }, [orders]);

  const tabs = [
    { id: "day", label: "Day" },
    { id: "month", label: "Month" },
    { id: "year", label: "Year" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 w-full text-center font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content (Chart) */}
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData[activeTab]}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Tabs;
