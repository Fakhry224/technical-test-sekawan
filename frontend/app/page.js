"use client";

import Image from "next/image";
import Navbar from "./(components)/Navbar";
import Tabs from "./(components)/Tabs";
import Sidebar from "./(components)/Sidebar";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex gap-10 p-10">
        <Sidebar />
        <div className="flex flex-col gap-6 w-fit">
          <div className="flex gap-10">
            <div className="flex bg-green-5 drop-shadow-lg p-8 rounded-3xl m">
              <div className="flex flex-col items-start">
                <p className="text-3xl mb-2">Welcome</p>
                <h1 className="font-bold text-5xl max-w-full leading-tight">
                  Fakhry Zahran Hakim
                </h1>
                <div className="rounded-full bg-green-3 text-white text-xl font-semibold text-center py-2 px-11 mt-16">
                  Admin
                </div>
              </div>
              <Image
                src="/illustrations/Profile.svg"
                alt="Ilustrasi Profile"
                width={250}
                height={250}
              />
            </div>
            <div className="flex flex-col justify-center items-center bg-green-2 p-6 rounded-3xl drop-shadow-lg text-green-5">
              <p className="font-bold text-2xl">Jumlah Pemesanan bulan ini</p>
              <p className="text-[8rem] font-bold">10</p>
            </div>
          </div>
          <div className="flex flex-col bg-green-5 rounded-3xl drop-shadow-lg p-8">
            <div className="flex flex-col">
              <h3 className="font-bold text-3xl">Pemakaian Kendaraan</h3>
              <span className="w-[500px] h-[1px] bg-black lin"></span>
            </div>
            <div className="flex">
              <Tabs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
