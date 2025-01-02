"use client";

import React from "react";
import Sidebar from "../../../(components)/Sidebar";
import InputForm from "./InputForm";
import Image from "next/image";
import Header from "../../../(components)/Header";

const PemesananForm = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row gap-6 p-6 sm:p-8 lg:p-10">
        <Sidebar />
        <div className="flex flex-col bg-green-50 rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10 w-full lg:w-3/4">
          {/* Header */}
          <div className="flex flex-col justify-start">
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-5">
              Form Pemesanan
            </h1>
            <span className="h-[1px] w-full lg:w-[40rem] bg-black"></span>
          </div>
          {/* Content */}
          <div className="flex flex-col lg:flex-row justify-around items-center gap-6 lg:gap-10 my-6 sm:my-8 lg:my-10">
            {/* Illustration */}
            <div className="flex justify-center lg:justify-start w-full lg:w-auto">
              <Image
                src="/illustrations/van-illustration.svg"
                alt="ilustrasi van"
                width={340}
                height={300}
                className="max-w-full h-auto"
              />
            </div>
            {/* Form */}
            <div className="w-full max-w-lg">
              <InputForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PemesananForm;
