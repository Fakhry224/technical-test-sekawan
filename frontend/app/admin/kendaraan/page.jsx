"use client";

import React, { useState, useEffect } from "react";
import Header from "../../(components)/Header";
import Sidebar from "../../(components)/Sidebar";
import Image from "next/image";
import Link from "next/link";

const KendaraanPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [serviceSchedules, setServiceSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesResponse, servicesResponse] = await Promise.all([
          fetch("http://localhost:8000/api/vehicles"),
          fetch("http://localhost:8000/api/service-schedules"),
        ]);

        const vehiclesData = await vehiclesResponse.json();
        const servicesData = await servicesResponse.json();

        setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
        setServiceSchedules(Array.isArray(servicesData) ? servicesData : []);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 p-4 md:p-10">
        <Sidebar />
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-10">
              <Link
                href="/kendaraan/tambah-kendaraan"
                className="flex bg-green-3 rounded-3xl drop-shadow-lg p-6 md:p-10 h-fit items-end justify-between gap-4 cursor-pointer transition-colors hover:text-green-5 hover:bg-green-2 group"
              >
                <h1 className="font-bold text-2xl md:text-3xl">
                  Tambah
                  <br />
                  Kendaraan
                </h1>
                <Image
                  src="/icons/plus-icon.svg"
                  alt="plus icon"
                  width={100}
                  height={100}
                  className="transition-all group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia group-hover:saturate-0"
                />
              </Link>
              <Link
                href="/kendaraan/tambah-servis"
                className="flex bg-green-3 rounded-3xl drop-shadow-lg p-6 md:p-10 h-fit items-end justify-between gap-4 cursor-pointer transition-colors hover:text-green-5 hover:bg-green-2 group"
              >
                <h1 className="font-bold text-2xl md:text-3xl">
                  Buat Jadwal
                  <br />
                  Service
                </h1>
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="calendar icon"
                  width={100}
                  height={100}
                  className="transition-all group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia group-hover:saturate-0"
                />
              </Link>
            </div>
            <div className="flex flex-col bg-green-5 p-6 md:p-10 rounded-3xl drop-shadow-lg">
              <h1 className="font-bold text-xl md:text-3xl mb-4">
                Jadwal Service
              </h1>
              <div className="flex font-bold text-sm md:text-lg bg-gray-200 p-3 rounded-t-md">
                <h2 className="flex-1 text-center">Vehicle</h2>
                <h2 className="flex-1 text-center">Service Date</h2>
                <h2 className="flex-1 text-center">Service Status</h2>
              </div>
              <div className="overflow-y-auto max-h-[11rem]">
                {serviceSchedules.map((data) => (
                  <div
                    key={data.service_id}
                    className="flex text-sm md:text-lg border-b"
                  >
                    <h2 className="flex-1 text-center">
                      Vehicle {data.vehicle?.vehicle_id}
                    </h2>
                    <h2 className="flex-1 text-center">{data.service_date}</h2>
                    <h2 className="flex-1 text-center">
                      {data.service_status}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-green-5 rounded-3xl drop-shadow-lg p-6 md:p-10">
            <h1 className="font-bold text-xl md:text-2xl mb-4">
              Daftar Kendaraan
            </h1>
            <div className="overflow-x-auto h-[16rem]">
              <div className="flex font-bold text-[10px] md:text-xl bg-gray-200 p-3 rounded-t-md text-center">
                <h2 className="flex-1">Vehicle</h2>
                <h2 className="flex-1">Office</h2>
                <h2 className="flex-1">Vehicle Type</h2>
                <h2 className="flex-1">Capacity</h2>
                <h2 className="flex-1">Ownership</h2>
                <h2 className="flex-1">Status</h2>
              </div>
              <div className="lg:overflow-y-auto max-h-[11rem]">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.vehicle_id}
                    className="flex text-[10px] md:text-xl border-b text-center"
                  >
                    <h2 className="flex-1">Vehicle {vehicle.vehicle_id}</h2>
                    <h2 className="flex-1">{vehicle.office?.office_name}</h2>
                    <h2 className="flex-1">{vehicle.vehicle_type}</h2>
                    <h2 className="flex-1">
                      {vehicle.vehicle_type === "Passanger"
                        ? `${vehicle.capacity} Orang`
                        : `${vehicle.capacity} Liter`}
                    </h2>
                    <h2 className="flex-1">{vehicle.vehicle_status}</h2>
                    <h2 className="flex-1">Available</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KendaraanPage;
