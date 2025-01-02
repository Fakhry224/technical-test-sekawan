"use client";

import React, { useEffect, useState } from "react";
import Header from "../../(components)/Header";
import Sidebar from "../../(components)/Sidebar";
import Image from "next/image";
import ApproveButton from "./ApproveButton";

const PengajuanPage = () => {
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

        Array.isArray(data) ? setOrders(data) : setOrders([data]);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="flex p-10 gap-10">
        <Sidebar />

        <div className="flex flex-col w-[70rem] bg-green-5 rounded-3xl drop-shadow-lg p-10">
          <h1 className="font-bold text-2xl mb-10">Riwayat Pemesanan</h1>
          <div className="flex flex-col">
            <div className="flex font-bold text-xl bg-gray-200 p-3 rounded-t-md text-center">
              <h2 className="flex-1">Requester</h2>
              <h2 className="flex-1">Driver</h2>
              <h2 className="flex-1">Vehicle</h2>
              <h2 className="flex-1">Usage Date</h2>
              <h2 className="flex-1">Return Date</h2>
              <h2 className="flex-1">Status</h2>
            </div>
            <span className="h-[1px] bg-black w-full"></span>
          </div>
          <div className="overflow-y-auto max-h-[11rem]">
            {orders.map((data) => {
              return (
                <div key={data.order_id} className="flex flex-col">
                  <div className="flex text-lg border-b items-center text-center">
                    <h2 className="flex-1">{data.employee?.employee_name}</h2>
                    <h2 className="flex-1">{data.driver?.employee_name}</h2>
                    <h2 className="flex-1">
                      Vehicle {data.vehicle?.vehicle_id}
                    </h2>
                    <h2 className="flex-1">{data.usage_date}</h2>
                    <h2 className="flex-1">{data.return_date}</h2>
                    {data.status === "Pending" ? (
                      <ApproveButton />
                    ) : (
                      <h2 className="flex-1">{data.order_status}</h2>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PengajuanPage;
