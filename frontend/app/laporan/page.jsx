import Image from "next/image";
import React from "react";
import DownloadButton from "./DownloadButton";
import Sidebar from "../(components)/Sidebar";
import Header from "../(components)/Header";

const LaporanPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row p-4 lg:p-10 gap-6 lg:gap-10">
        <Sidebar />
        <div className="flex flex-col gap-6 lg:gap-10 w-full">
          <div className="flex flex-col lg:flex-row bg-green-5 rounded-3xl drop-shadow-lg p-6 lg:p-10 h-fit items-center lg:items-start gap-6">
            <Image
              src="/illustrations/laporan-illustration.svg"
              alt="ilustrasi laporan"
              width={350}
              height={350}
              className="w-full max-w-[350px] h-auto"
            />
            <div className="flex flex-col gap-4 lg:gap-8 items-center lg:items-start w-full">
              <p className="text-xl lg:text-2xl font-semibold text-center lg:text-left">
                Pantau dan kelola data pemesanan kendaraan dengan mudah. Unduh
                laporan periodik dalam format Excel untuk analisis yang cepat
                dan akurat.
              </p>
              <DownloadButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaporanPage;
