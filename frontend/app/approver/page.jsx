"use client";

import Image from "next/image";
import Header from "../(components)/Header";
import Tabs from "../(components)/Tabs";
import Sidebar from "../(components)/Sidebar";
import { useEffect, useState } from "react";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await fetch(
          "http://localhost:8000/api/users/3"
        );
        const profileData = await profileResponse.json();
        setProfile(profileData.data);

        setLoadingProfile(false);
      } catch {
        setLoadingProfile(false);
      }

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

        setLoadingOrders(false);
      } catch (err) {
        setError(err.message);
        setLoadingOrders(false);
      }
    };

    fetchData();
  }, []);

  if (loadingProfile || loadingOrders) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="h-screen flex flex-col">
      <Header role={"Admin"} />
      <div className="flex flex-1 flex-col md:flex-row gap-4 md:gap-10 p-4 md:p-10">
        <Sidebar />
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex bg-green-5 drop-shadow-lg p-6 md:p-8 rounded-3xl flex-1 items-center justify-between">
              <div className="flex flex-col items-start">
                <p className="text-2xl md:text-3xl mb-2">Welcome</p>
                <h1 className="font-bold text-4xl lg:text-5xl leading-tight">
                  {profile?.name || "Loading..."}
                </h1>
                <div className="rounded-full bg-green-3 text-white text-lg md:text-xl font-semibold text-center py-2 px-8 mt-8 md:mt-16">
                  {profile?.role || "Loading..."}
                </div>
              </div>
              <Image
                src="/illustrations/Profile.svg"
                alt="Ilustrasi Profile"
                width={200}
                height={200}
                className="hidden lg:block"
              />
            </div>
            <div className="flex flex-col justify-center items-center bg-green-2 p-6 md:p-8 rounded-3xl drop-shadow-lg text-green-5">
              <p className="font-bold text-xl md:text-2xl text-center">
                Jumlah Pemesanan Bulan Ini
              </p>
              <p className="text-5xl md:text-[8rem] font-bold">
                {orders.length > 0 ? orders.length : "0"}
              </p>
            </div>
          </div>
          <div className="flex flex-col bg-green-5 rounded-3xl drop-shadow-lg p-6 md:p-8">
            <div className="flex flex-col mb-4">
              <h3 className="font-bold text-2xl md:text-3xl">
                Pemakaian Kendaraan
              </h3>
              <span className="w-full md:w-[500px] h-[1px] bg-black"></span>
            </div>
            <div className="flex">
              <Tabs orders={orders} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
