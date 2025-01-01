"use client";

import React from "react";
import Navbar from "../../(components)/Navbar";
import Sidebar from "../../(components)/Sidebar";
import InputForm from "./InputForm";
import Image from "next/image";

const KendaraanForm = () => {
  return (
    <>
      <Navbar />
      <div className="flex p-10 gap-10">
        <Sidebar />
        <div className="flex flex-col bg-green-5 rounded-3xl drop-shadow-lg p-10">
          <div className="flex flex-col justify-start">
            <h1 className="font-bold text-3xl mb-5">Form Tambah Kendaraan</h1>
            <span className="h-[1px] w-[40rem] bg-black"></span>
          </div>
          <div className="flex justify-between gap-10 my-10 mx-5">
            <Image
              src="/illustrations/van-illustration.svg"
              alt="ilustrasi van"
              width={380}
              height={340}
            />
            <InputForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default KendaraanForm;
