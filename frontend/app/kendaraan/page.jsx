"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../(components)/Navbar";
import Sidebar from "../(components)/Sidebar";
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

        console.log("Vehicles Data:", vehiclesData);
        console.log("Service Schedules Data:", servicesData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //   const serviceData = [
  //     { id: 1, vehicle: "Vehicle 1", date: "30/12/2024", status: "On Progress" },
  //     { id: 2, vehicle: "Vehicle 2", date: "1/1/2025", status: "Done" },
  //     { id: 3, vehicle: "Vehicle 3", date: "1/1/2025", status: "Not Started" },
  //   ];

  //   const vehicleData = [
  //     {
  //       id: 1,
  //       vehicle: "Vehicle 1",
  //       office: "Office 1",
  //       type: "Passanger",
  //       capacity: 15,
  //       ownership: "Owned",
  //       status: "In Use",
  //     },
  //     {
  //       id: 2,
  //       vehicle: "Vehicle 2",
  //       office: "Office 2",
  //       type: "Freight",
  //       capacity: 1,
  //       ownership: "Rented",
  //       status: "Available",
  //     },
  //     {
  //       id: 3,
  //       vehicle: "Vehicle 3",
  //       office: "Office 3",
  //       type: "Passanger",
  //       capacity: 20,
  //       ownership: "Owned",
  //       status: "In Use",
  //     },
  //   ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="flex gap-10 p-10">
        <Sidebar />
        <div className="flex flex-col gap-10">
          <div className="flex gap-10">
            <div className="flex flex-col gap-10">
              <Link
                href="/kendaraan/tambah-kendaraan"
                className="flex bg-green-3 rounded-3xl drop-shadow-lg p-10 h-fit items-end gap-4 cursor-pointer transition-colors hover:text-green-5 hover:bg-green-2 group"
              >
                <h1 className="font-bold text-3xl">
                  Tambah
                  <br />
                  Kendaraan
                </h1>
                <Image
                  src="/icons/plus-icon.svg"
                  alt="plus icon"
                  width={140}
                  height={140}
                  className="transition-all group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia group-hover:saturate-0"
                />
              </Link>
              <Link
                href="/kendaraan/tambah-servis"
                className="flex bg-green-3 rounded-3xl drop-shadow-lg p-10 h-fit items-end gap-4 cursor-pointer transition-colors hover:text-green-5 hover:bg-green-2 group"
              >
                <h1 className="font-bold text-3xl">
                  Buat Jadwal
                  <br />
                  Service
                </h1>
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="plus icon"
                  width={120}
                  height={120}
                  className="transition-all group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia group-hover:saturate-0"
                />
              </Link>
            </div>
            <div className="flex flex-col bg-green-5 p-10 rounded-3xl drop-shadow-lg">
              <div className="flex flex-col">
                <h1 className="font-bold text-3xl mb-5">Jadwal Service</h1>
                <span className="w-full bg-black h-[1px]"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex font-bold text-xl bg-gray-200 p-3 rounded-t-md">
                  <h2 className="flex-1 text-center">Vehicle</h2>
                  <h2 className="flex-1 text-center">Service Date</h2>
                  <h2 className="flex-1 text-center">Service Status</h2>
                </div>
                <span className="h-[1px] bg-black w-full"></span>
              </div>
              <div className="overflow-y-auto max-h-[11rem]">
                {serviceSchedules.map((data) => {
                  return (
                    <div key={data.service_id} className="flex flex-col">
                      <div className="flex text-lg border-b">
                        <h2 className="flex-1 text-center">
                          Vehicle {data.vehicle?.vehicle_id}
                        </h2>
                        <h2 className="flex-1 text-center">
                          {data.service_date}
                        </h2>
                        <h2 className="flex-1 text-center">
                          {data.service_status}
                        </h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-green-5 rounded-3xl drop-shadow-lg p-10">
            <h1 className="font-bold text-2xl mb-10">Daftar Kendaraan</h1>
            <div className="flex flex-col">
              <div className="flex font-bold text-xl bg-gray-200 p-3 rounded-t-md">
                <h2 className="flex-1 text-center">Vehicle</h2>
                <h2 className="flex-1 text-center">Office</h2>
                <h2 className="flex-1 text-center">Vehicle Type</h2>
                <h2 className="flex-1 text-center">Capacity</h2>
                <h2 className="flex-1 text-center">Ownership</h2>
                <h2 className="flex-1 text-center">Status</h2>
              </div>
              <span className="h-[1px] bg-black w-full"></span>
            </div>
            <div className="overflow-y-auto max-h-[11rem]">
              {vehicles.map((vehicle) => {
                return (
                  <div key={vehicle.vehicle_id} className="flex flex-col">
                    <div className="flex text-lg border-b">
                      <h2 className="flex-1 text-center">
                        Vehicle {vehicle.vehicle_id}
                      </h2>
                      <h2 className="flex-1 text-center">
                        {vehicle.office?.office_name}
                      </h2>
                      <h2 className="flex-1 text-center">
                        {vehicle.vehicle_type}
                      </h2>
                      <h2 className="flex-1 text-center">
                        {vehicle.vehicle_type === "Passanger"
                          ? `${vehicle.capacity} Orang`
                          : `${vehicle.capacity} Liter`}
                      </h2>
                      <h2 className="flex-1 text-center">
                        {vehicle.vehicle_status}
                      </h2>
                      {/* <h2 className="flex-1 text-center">{vehicle.status}</h2> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KendaraanPage;
