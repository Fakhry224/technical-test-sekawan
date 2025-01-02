"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../(components)/Navbar";
import Sidebar from "../(components)/Sidebar";
import Image from "next/image";
import Link from "next/link";

const PemesananPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/vehicle-orders/employee/3"
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([data]);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row p-4 lg:p-10 gap-6 lg:gap-10">
        <Sidebar />
        <div className="flex flex-col gap-6 lg:gap-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Button Pesan Kendaraan */}
            <Link
              href="/pemesanan/tambah-pesanan"
              className="flex bg-green-3 rounded-3xl drop-shadow-lg h-fit p-6 lg:p-8 cursor-pointer transition-colors hover:text-green-5 hover:bg-green-2 group"
            >
              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row gap-5">
                  <Image
                    src="/illustrations/speed.svg"
                    alt="ilustrasi mobil"
                    width={190}
                    height={160}
                    className="transition-all group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia group-hover:saturate-0"
                  />
                  <Image
                    src="/icons/plus-icon.svg"
                    alt="plus icon"
                    width={100}
                    height={90}
                    className="transition-all group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia group-hover:saturate-0"
                  />
                </div>
                <h1 className="font-bold text-xl lg:text-3xl mt-4">
                  Pesan Kendaraan
                </h1>
              </div>
            </Link>
            {/* Card Status Pemesanan */}
            <div className="flex flex-col bg-green-5 p-6 lg:p-8 rounded-3xl drop-shadow-lg max-h-[20rem]">
              <div className="flex flex-col">
                <h3 className="font-bold text-xl lg:text-3xl lg:mb-5 overflow-y-auto">
                  Status Pemesanan
                </h3>
                <span className="bg-black h-[1px] w-full mb-6 lg:mb-8"></span>
              </div>
              {orders.map((pesanan, idx) => (
                <div key={idx} className="flex justify-between mb-3 lg:mb-4">
                  <p className="font-medium text-sm lg:text-xl">
                    {pesanan.order_id}. Pesanan {pesanan.order_id}
                  </p>
                  <p className="font-medium text-sm lg:text-xl">
                    {pesanan.order_status}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Riwayat Pemesanan */}
          <div className="flex flex-col bg-green-5 rounded-3xl drop-shadow-lg p-6 lg:p-10 overflow-y-auto">
            <h1 className="font-bold text-lg lg:text-2xl mb-6 lg:mb-10">
              Riwayat Pemesanan
            </h1>
            <div className="flex flex-col">
              <div className="flex font-bold text-[10px] md:text-xl bg-gray-200 p-3 rounded-t-md text-center">
                <h2 className="flex-1">Order Id</h2>
                <h2 className="flex-1">Driver</h2>
                <h2 className="flex-1">Konsumsi BBM</h2>
                <h2 className="flex-1">Vehicle Type</h2>
                <h2 className="flex-1">Capacity</h2>
                <h2 className="flex-1">Usage Date</h2>
                <h2 className="flex-1">Order Date</h2>
              </div>
              <span className="h-[1px] bg-black w-full"></span>
            </div>
            <div className="overflow-y-auto h-[16rem]">
              {orders.map((riwayat, idx) => (
                <div
                  key={riwayat.order_Id}
                  className="flex text-[10px] md:text-xl border-b text-center"
                >
                  <h2 className="flex-1">{riwayat.order_id}</h2>
                  <h2 className="flex-1">{riwayat.driver?.employee_name}</h2>
                  <h2 className="flex-1">{riwayat.bbm_usage} Liter</h2>
                  <h2 className="flex-1">{riwayat.vehicle?.vehicle_type}</h2>
                  <h2 className="flex-1">
                    {riwayat.vehicle?.vehicle_type === "Passenger"
                      ? `${riwayat.vehicle?.capacity} Orang`
                      : `${riwayat.vehicle?.capacity} Liter`}
                  </h2>
                  <h2 className="flex-1">{riwayat.usage_date}</h2>
                  <h2 className="flex-1">{riwayat.order_date}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PemesananPage;
