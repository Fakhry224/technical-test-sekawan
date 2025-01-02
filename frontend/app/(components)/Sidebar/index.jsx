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
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
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
    <div>
      {/* Hamburger Menu */}
      <button
        className="lg:hidden text-white p-4 bg-green-1 rounded-full fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-1 text-white flex flex-col p-4 z-40 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative md:h-[50rem] md:w-64 md:rounded-3xl`}
      >
        <div className="flex-1 mt-16 lg:mt-5">
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

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
