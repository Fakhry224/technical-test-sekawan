import React from "react";
import Navbar from "../(components)/Navbar";
import Sidebar from "../(components)/Sidebar";
import Image from "next/image";
import ApproveButton from "./ApproveButton";

const PengajuanPage = () => {
  const requesterData = [
    {
      id: 1,
      requester: "David",
      driver: "Budi",
      vehicle: "Vehicle 1",
      usageDate: "29/12/2024",
      returnDate: "30/12/2024",
      status: "Pending",
    },
    {
      id: 2,
      requester: "Ahmad",
      driver: "Joko",
      vehicle: "Vehicle 2",
      usageDate: "12/11/2024",
      returnDate: "13/11/2024",
      status: "Pending",
    },
    {
      id: 3,
      requester: "Kevin",
      driver: "Abdul",
      vehicle: "Vehicle 3",
      usageDate: "2/11/2024",
      returnDate: "5/11/2024",
      status: "Pending",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex p-10 gap-10">
        <Sidebar />

        <div className="flex flex-col w-[70rem] bg-green-5 rounded-3xl drop-shadow-lg p-10">
          <h1 className="font-bold text-2xl mb-10">Riwayat Pemesanan</h1>
          <div className="flex flex-col">
            <div className="flex font-bold text-xl bg-gray-200 p-3 rounded-t-md">
              <h2 className="flex-1 text-center">Requester</h2>
              <h2 className="flex-1 text-center">Driver</h2>
              <h2 className="flex-1 text-center">Vehicle</h2>
              <h2 className="flex-1 text-center">Usage Date</h2>
              <h2 className="flex-1 text-center">Return Date</h2>
              <h2 className="flex-1 text-center">Status</h2>
            </div>
            <span className="h-[1px] bg-black w-full"></span>
          </div>
          <div className="overflow-y-auto max-h-[11rem]">
            {requesterData.map((data, idx) => {
              return (
                <div key={idx} className="flex flex-col">
                  <div className="flex text-lg border-b items-center">
                    <h2 className="flex-1 text-center">{data.requester}</h2>
                    <h2 className="flex-1 text-center">{data.driver}</h2>
                    <h2 className="flex-1 text-center">{data.vehicle}</h2>
                    <h2 className="flex-1 text-center">{data.usageDate}</h2>
                    <h2 className="flex-1 text-center">{data.returnDate}</h2>
                    {data.status === "Pending" ? (
                      <ApproveButton />
                    ) : (
                      <h2 className="flex-1 text-center">{data.status}</h2>
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
