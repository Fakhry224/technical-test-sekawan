"use client";

import React from "react";
import Header from "../../../(components)/Header";
import Sidebar from "../../../(components)/Sidebar";
import Image from "next/image";
import InputForm from "./InputForm";

const KendaraanForm = () => {
  return (
    <>
      <Header />
      <div className="flex p-10 gap-10">
        <Sidebar />
        <div className="flex flex-col bg-green-5 rounded-3xl drop-shadow-lg p-10 h-fit">
          <div className="flex flex-col justify-start">
            <h1 className="font-bold text-3xl mb-5">
              Form Tambah Jadwal Servis
            </h1>
            <span className="h-[1px] w-[40rem] bg-black"></span>
          </div>
          <div className="flex justify-between gap-10 my-10 mx-5">
            <Image
              src="/illustrations/survey-illustration.svg"
              alt="ilustrasi van"
              width={290}
              height={250}
            />
            <InputForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default KendaraanForm;
