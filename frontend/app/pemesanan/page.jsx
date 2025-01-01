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

  const dataDummy = [
    { id: 1, namaPesanan: "Pesanan 1", status: "On Progress" },
    { id: 2, namaPesanan: "Pesanan 2", status: "Approve" },
    { id: 3, namaPesanan: "Pesanan 3", status: "Cancelled" },
  ];

  const dataDummyOrder = [
    {
      orderId: 1,
      driver: "Budi",
      bbm: "15 Liter",
      type: "Passanger",
      capacity: "15",
      usageDate: "29/12/2024",
      orderDate: "12/12/2024",
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {" "}
      <Navbar />{" "}
      <div className="flex p-10 gap-10">
        {" "}
        <Sidebar />{" "}
        <div className="flex flex-col gap-10">
          {" "}
          <div className="flex gap-10">
            {" "}
            {/* Button Pesan Kendaraan */}{" "}
            <div className="flex bg-green-3 rounded-3xl drop-shadow-lg h-fit p-8 cursor-pointer transition-colors hover:text-green-5 hover:bg-green-2 group">
              {" "}
              <Link href="/pemesanan/tambah-pesanan" className="flex flex-col">
                {" "}
                <div className="flex gap-5 mt-5">
                  {" "}
                  <Image
                    src="/illustrations/speed.svg"
                    alt="ilustrasi mobil"
                    width={190}
                    height={160}
                    className="transition-all group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia group-hover:saturate-0"
                  />{" "}
                  <Image
                    src="/icons/plus-icon.svg"
                    alt="plus icon"
                    width={100}
                    height={90}
                    className="transition-all group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia group-hover:saturate-0"
                  />{" "}
                </div>{" "}
                <h1 className="font-bold text-3xl mt-2">Pesan Kendaraan</h1>{" "}
              </Link>{" "}
            </div>{" "}
            {/* Card Status Pemesanan */}{" "}
            <div className="flex flex-col bg-green-5 p-8 rounded-3xl drop-shadow-lg h-fit">
              {" "}
              <h3 className="font-bold text-3xl mb-5">Status Pemesanan</h3>{" "}
              <span className="bg-black h-[1px] w-[30rem] mb-8"></span>{" "}
              {orders.map((pesanan, idx) => (
                <div key={idx} className="flex justify-between mb-4">
                  {" "}
                  <p className="font-medium text-xl">
                    {pesanan.order_id}. Pesanan {pesanan.order_id}
                  </p>{" "}
                  <p className="font-medium text-xl">{pesanan.order_status}</p>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex flex-col bg-green-5 rounded-3xl drop-shadow-lg p-10">
            {" "}
            <h1 className="font-bold text-2xl mb-10">Riwayat Pemesanan</h1>{" "}
            <div className="flex flex-col">
              {" "}
              <div className="flex font-bold text-xl bg-gray-200 p-3 rounded-t-md">
                {" "}
                <h2 className="flex-1 text-center">Order Id</h2>{" "}
                <h2 className="flex-1 text-center">Driver</h2>{" "}
                <h2 className="flex-1 text-center">Konsumsi BBM</h2>{" "}
                <h2 className="flex-1 text-center">Vehicle Type</h2>{" "}
                <h2 className="flex-1 text-center">Capacity</h2>{" "}
                <h2 className="flex-1 text-center">Usage Date</h2>{" "}
                <h2 className="flex-1 text-center">Order Date</h2>{" "}
              </div>{" "}
              <span className="h-[1px] bg-black w-full"></span>{" "}
            </div>{" "}
            <div className="overflow-y-auto max-h-[11rem]">
              {" "}
              {orders.map((riwayat, idx) => (
                <div key={idx} className="flex flex-col">
                  {" "}
                  <div key={idx} className="flex text-lg border-b">
                    {" "}
                    <h2 className="flex-1 text-center">
                      {riwayat.order_id}
                    </h2>{" "}
                    <h2 className="flex-1 text-center">
                      {riwayat.driver?.employee_name}
                    </h2>{" "}
                    <h2 className="flex-1 text-center">
                      {riwayat.bbm_usage} Liter
                    </h2>{" "}
                    <h2 className="flex-1 text-center">
                      {riwayat.vehicle?.vehicle_type}
                    </h2>{" "}
                    <h2 className="flex-1 text-center">
                      {" "}
                      {riwayat.vehicle?.vehicle_type === "Passenger"
                        ? `${riwayat.vehicle?.capacity} Orang`
                        : `${riwayat.vehicle?.capacity} Liter`}{" "}
                    </h2>{" "}
                    <h2 className="flex-1 text-center">{riwayat.usage_date}</h2>{" "}
                    <h2 className="flex-1 text-center">{riwayat.order_date}</h2>{" "}
                  </div>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};
export default PemesananPage;
