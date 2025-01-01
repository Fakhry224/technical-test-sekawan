"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaCar,
  FaCalendarAlt,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    // Tetapkan nilai setelah mount
    setActiveMenu(router.pathname);
  }, [router.pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, url: "/" },
    { name: "Kendaraan", icon: <FaCar />, url: "/kendaraan" },
    { name: "Pemesanan", icon: <FaCalendarAlt />, url: "/pemesanan" },
    { name: "Pengguna", icon: <FaUsers />, url: "/pengguna" },
    { name: "Laporan", icon: <FaFileAlt />, url: "/laporan" },
  ];

  return (
    <div
      key={router.pathname}
      className="h-screen w-64 bg-green-1 text-white flex flex-col rounded-3xl p-4"
    >
      <div className="flex-1">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.url}>
            <div
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors ${
                activeMenu === item.url ? "bg-green-3" : "hover:bg-green-3"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </div>
              <span>&#8250;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
