import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("day");

  // Dummy data untuk grafik
  const data = {
    day: [
      { name: "Mon", value: 10 },
      { name: "Tue", value: 15 },
      { name: "Wed", value: 20 },
      { name: "Thu", value: 25 },
      { name: "Fri", value: 30 },
    ],
    month: [
      { name: "Jan", value: 100 },
      { name: "Feb", value: 120 },
      { name: "Mar", value: 150 },
      { name: "Apr", value: 200 },
      { name: "May", value: 250 },
    ],
    year: [
      { name: "2020", value: 500 },
      { name: "2021", value: 700 },
      { name: "2022", value: 900 },
      { name: "2023", value: 1200 },
    ],
  };

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
          <LineChart data={data[activeTab]}>
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
